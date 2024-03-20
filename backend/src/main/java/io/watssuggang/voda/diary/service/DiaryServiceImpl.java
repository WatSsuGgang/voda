package io.watssuggang.voda.diary.service;


import io.watssuggang.voda.common.enums.*;
import io.watssuggang.voda.diary.domain.*;
import io.watssuggang.voda.diary.dto.req.*;
import io.watssuggang.voda.diary.dto.req.DiaryChatRequestDto.*;
import io.watssuggang.voda.diary.dto.req.TalkListRequest.*;
import io.watssuggang.voda.diary.dto.res.*;
import io.watssuggang.voda.diary.dto.res.DiaryChatResponseDto.*;
import io.watssuggang.voda.diary.exception.*;
import io.watssuggang.voda.diary.repository.*;
import io.watssuggang.voda.diary.util.*;
import java.util.*;
import java.util.stream.*;
import lombok.*;
import lombok.extern.slf4j.*;
import org.json.*;
import org.springframework.stereotype.*;
import org.springframework.web.reactive.function.client.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class DiaryServiceImpl implements DiaryService {

    private final WebClient chatClient;
    private final DiaryRepository diaryRepository;
    private final TalkRepository talkRepository;

    private DiaryChatResponseDto getChat(DiaryChatRequestDto dto) {
        return chatClient.post()
            .uri("https://api.anthropic.com/v1/messages")
            .bodyValue(dto)
            .retrieve()
            .bodyToMono(DiaryChatResponseDto.class)
            .block();
    }

    @Override
    public DiaryChatResponseDto init() {
        List<MessageDTO> message = new ArrayList<>();
        message.add(new MessageDTO("user", PromptHolder.INIT_PROMPT));
        DiaryChatRequestDto reqDto = DiaryChatRequestDto.builder()
            .messages(message)
            .build();
        return getChat(reqDto);
    }

    @Override
    public Map<String, Object> getChatList(int id) {
        List<Talk> talks = talkRepository.findAllByDiary_DiaryId(id);

        List<Map<String, String>> talkList = talks.stream()
            .map(talk -> {
                Map<String, String> talkMap = new HashMap<>();
                String key = talk.getTalkSpeaker().equals("02") ? "q" : "a";
                talkMap.put(key, talk.getTalkContent());
                return talkMap;
            })
            .toList();

        Map<String, Object> resultMap = new HashMap<>();

        resultMap.put("talk_list", talkList);

        return resultMap;

    }

    // 다이어리 생성
    @Override
    public void createDiary(List<TalkReq> talkList, int diaryId) {

        String allAnswers = talkList.stream()
            .map(TalkListRequest.TalkReq::getA) // Talk 객체에서 answer만 추출
            .collect(Collectors.joining(". ")); // 공백으로 각 answer를 구분하여 이어 붙임

        log.info("답변만 모아놓기: " + allAnswers);

        ContentDTO completedDiary = callClaude(allAnswers);

        String answerText = completedDiary != null ? completedDiary.getText() : null;

        if (answerText == null) {
            throw new DiaryNotCreateException();
        }

        log.info("---Claude의 답변---");
        log.info(answerText);

        JSONObject jsonObject = new JSONObject(answerText);
        String title = jsonObject.getString("title");
        String content = jsonObject.getString("diary");
        String emotion = jsonObject.getString("emotion");

        Diary diary = Diary.builder()
            .diaryId(diaryId)
            .diarySummary(title)
            .diaryEmotion(Emotion.valueOf(emotion))
            .diaryContent(content)
            .build();

        diaryRepository.save(diary);
    }

    //Claude에게 API 요청해서 일기 제목, 내용, 감정을 받음
    private ContentDTO callClaude(String allAnswers) {
        List<MessageDTO> messages = new ArrayList<>();
        messages.add(new MessageDTO("user", allAnswers + PromptHolder.CREATE_DIARY_MESSAGE));
        DiaryChatRequestDto req = DiaryChatRequestDto.builder().messages(messages).build();

        DiaryChatResponseDto diaryChatResponseDto = chatClient.post()
            .uri("https://api.anthropic.com/v1/messages")
            .bodyValue(req)
            .retrieve()
            .bodyToMono(DiaryChatResponseDto.class)
            .block();

        return diaryChatResponseDto != null ? diaryChatResponseDto.getContent().get(0) : null;
    }

}

package io.watssuggang.voda.diary.service;


import io.watssuggang.voda.common.enums.Emotion;
import io.watssuggang.voda.common.enums.Speaker;
import io.watssuggang.voda.common.exception.ErrorCode;
import io.watssuggang.voda.diary.domain.Diary;
import io.watssuggang.voda.diary.domain.Talk;
import io.watssuggang.voda.diary.dto.req.*;
import io.watssuggang.voda.diary.dto.req.DiaryChatRequestDto.MessageDTO;
import io.watssuggang.voda.diary.dto.req.TalkListRequest.TalkRequest;
import io.watssuggang.voda.diary.dto.res.DiaryChatResponseDto;
import io.watssuggang.voda.diary.dto.res.DiaryChatResponseDto.ContentDTO;
import io.watssuggang.voda.diary.dto.res.DiaryDetailResponse;
import io.watssuggang.voda.diary.exception.DiaryNotCreatedException;
import io.watssuggang.voda.diary.exception.DiaryNotFoundException;
import io.watssuggang.voda.diary.repository.DiaryRepository;
import io.watssuggang.voda.diary.repository.TalkRepository;
import io.watssuggang.voda.diary.util.PromptHolder;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@Slf4j
@RequiredArgsConstructor
public class DiaryServiceImpl implements DiaryService {

    private final WebClient chatClient;
    private final WebClient karloClient;
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
    public KarloResponse createImage(KarloRequest karloRequest) {
        System.out.println(karloRequest);
        return karloClient.post()
            .bodyValue(karloRequest)
            .retrieve()
            .bodyToMono(KarloResponse.class)
            .block();
    }

    @Override
    public Map<String, Object> getChatList(int id, Integer memberId) {
        List<Talk> talks = talkRepository.findAllByDiary_DiaryId(id);

        Optional<Integer> writerId = talks.stream().map(Talk::getWriter).findFirst();

        if (writerId.isPresent() && isUnAuthorized(writerId.get(), memberId)) {
            throw new DiaryNotCreatedException(ErrorCode.TALK_READ_UNAUTHORIZED);
        }

        List<Map<String, String>> talkList = talks.stream()
            .map(talk -> {
                Map<String, String> talkMap = new HashMap<>();
                String key =
                    talk.getTalkSpeaker().equals(Speaker.AI) ? "question" : "answer";
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
    public void createDiary(List<TalkRequest> talkList, int diaryId, Integer memberId) {

        // 생성하려고 하는 일기가 없는 일기일 경우 예외 던지기
//        if (!isAuthorized(existedDiary.getWriter(), memberId)) {
//            throw new DiaryNotCreatedException(ErrorCode.DIARY_CREATE_UNAUTHORIZED);
//        }

        String allAnswers = talkList.stream()
            .map(TalkListRequest.TalkRequest::getAnswer) // Talk 객체에서 answer만 추출
            .collect(Collectors.joining(". ")); // 공백으로 각 answer를 구분하여 이어 붙임

        log.info("합친 답변: " + allAnswers);

        ContentDTO completedDiary = callClaude(allAnswers);

        String answerText = completedDiary != null ? completedDiary.getText() : null;

        if (answerText == null) {
            throw new DiaryNotCreatedException(ErrorCode.DIARY_CONTENT_NOT_CREATED);
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

        //TODO:  이미지 생성 로직 예외처리
        // throw new DiaryNotCreatedException(ErrorCode.DIARY_IMAGE_NOT_CREATED);

        diaryRepository.save(diary);
    }

    @Override
    public DiaryDetailResponse getDiaryDetail(Integer memberId, int diaryId) {

        Diary diary = diaryRepository.findById(diaryId).orElseThrow(DiaryNotFoundException::new);

        if (isUnAuthorized(diary.getWriter(), memberId)) {
            throw new DiaryNotCreatedException(ErrorCode.DIARY_CREATE_UNAUTHORIZED);
        }

        return DiaryDetailResponse.of(diary);

    }

    @Override
    public List<DiaryDetailResponse> getDiaryList(LocalDateTime start, LocalDateTime end,
        String emotion, Integer memberId) {

        List<DiaryDetailResponse> responseList = new ArrayList<>();

        List<Diary> filteredDiaryList = diaryRepository.findDiariesByCondition(start, end,
            emotion, memberId);

        Optional<Integer> writerId = filteredDiaryList.stream().map(Diary::getWriter).findFirst();

        if (writerId.isPresent() && isUnAuthorized(writerId.get(),
            memberId)) {
            throw new DiaryNotCreatedException(ErrorCode.DIARY_READ_UNAUTHORIZED);
        }

        for (Diary diary : filteredDiaryList) {
            DiaryDetailResponse detailResponse = DiaryDetailResponse.of(diary);
            responseList.add(detailResponse);
        }

        return responseList;
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

    // 자신의 일기를 조회하거나 수정하려고 하는 지 검사
    private boolean isUnAuthorized(Integer diaryMemberId, Integer loginMemberId) {
        return !diaryMemberId.equals(loginMemberId);
    }

}

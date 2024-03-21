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
import java.time.*;
import java.util.*;
import java.util.stream.*;
import lombok.*;
import lombok.extern.slf4j.*;
import org.json.*;
import org.springframework.http.*;
import org.springframework.stereotype.*;
import org.springframework.web.reactive.function.client.*;
import org.springframework.web.server.*;
import io.watssuggang.voda.diary.dto.req.*;
import io.watssuggang.voda.diary.dto.req.DiaryChatRequestDto.MessageDTO;
import io.watssuggang.voda.diary.dto.res.DiaryChatResponseDto;
import io.watssuggang.voda.diary.util.PromptHolder;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@Slf4j
@RequiredArgsConstructor
public class DiaryServiceImpl implements DiaryService {

    private final WebClient chatClient;
    private final WebClient karloClient;
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
    public KarloResponse createImage(KarloRequest karloRequest) {
        System.out.println(karloRequest);
        return karloClient.post()
                .bodyValue(karloRequest)
                .retrieve()
                .bodyToMono(KarloResponse.class)
                .block();
    }

//  @Override
//  @SuppressWarnings("resource")
//  public String fileToString(File file) throws IOException {
//
//    //필요한 객체들을 세팅한다.
//    //스트링으로 최종변환한 값을 담는 객체
//    String fileString = new String();
//    //읽은 파일을 인풋 스트림으로 활용하기 위한 객체
//    FileInputStream inputStream = null;
//    //읽은 스트림을 바이트배열로 만들기 위한 객체
//    ByteArrayOutputStream byteOutStream = null;
//
//    //파일을 인풋 스트림 객체에 넣는다.
//    inputStream = new FileInputStream(file);
//    byteOutStream = new ByteArrayOutputStream();
//    int len = 0;
//    //바이트 배열임시생성 (왜 1024인지는 모른다 안다면 댓글부탁 드립니다.)
//    byte[] buf = new byte[1024];
//
//    //읽어들인 스트림이 False(-1)이 아닐때까지 루프를 돌린다.
//    while ((len = inputStream.read(buf)) != -1) {
//      //byte배열로 데이터를 입출력하는기 위해 읽어들인다.
//      byteOutStream.write(buf, 0, len);
//
//    }
//
//    //바이트배열에 읽은 스트림을 넣는다.
//    byte[] fileArray = byteOutStream.toByteArray();
//
//    Base64.Encoder encoder = Base64.getEncoder();
//    byte[] encoderResult = null;
//    //읽어들인 바이트배열을 통신을위한base64로 인코딩해서 바이트배열에 넣는다.
//    encoderResult = encoder.encode(fileArray);
//
//    //해당 바이트 배열을 스트링으로 변환한다.
//    fileString = new String(encoderResult);
//
//    return fileString;
//
//  }
    @Override
    public Map<String, Object> getChatList(int id) {
        List<Talk> talks = talkRepository.findAllByDiary_DiaryId(id);

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
    public void createDiary(List<TalkRequest> talkList, int diaryId) {

        String allAnswers = talkList.stream()
            .map(TalkListRequest.TalkRequest::getAnswer) // Talk 객체에서 answer만 추출
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

    @Override
    public DiaryDetailResponse getDiaryDetail(int memberId, int id) {

        Diary diary = diaryRepository.findById(id).orElseThrow(DiaryNotFoundException::new);

        if (!diary.getMember().getMemberId().equals(memberId)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "자신의 일기만 볼 수 있습니다.");
        }

        return DiaryDetailResponse.of(diary);

    }

    @Override
    public List<DiaryDetailResponse> getDiaryList(LocalDateTime start, LocalDateTime end,
        String emotion, int memberId) {

        List<Diary> filteredDiaryList = diaryRepository.findDiariesByCondition(start, end,
            Emotion.valueOf(emotion), memberId);

        List<DiaryDetailResponse> responseList = new ArrayList<>();

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

}

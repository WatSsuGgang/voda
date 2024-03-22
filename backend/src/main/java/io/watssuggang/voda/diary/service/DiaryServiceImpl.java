package io.watssuggang.voda.diary.service;


import io.watssuggang.voda.common.enums.Emotion;
import io.watssuggang.voda.common.enums.Speaker;
import io.watssuggang.voda.diary.domain.Diary;
import io.watssuggang.voda.diary.domain.Talk;
import io.watssuggang.voda.diary.dto.req.*;
import io.watssuggang.voda.diary.dto.req.DiaryChatRequestDto.MessageDTO;
import io.watssuggang.voda.diary.dto.req.TalkListRequest.TalkRequest;
import io.watssuggang.voda.diary.dto.res.*;
import io.watssuggang.voda.diary.dto.res.DiaryChatResponseDto.ContentDTO;
import io.watssuggang.voda.diary.exception.DiaryNotCreateException;
import io.watssuggang.voda.diary.exception.DiaryNotFoundException;
import io.watssuggang.voda.diary.repository.DiaryRepository;
import io.watssuggang.voda.diary.repository.TalkRepository;
import io.watssuggang.voda.diary.util.PromptHolder;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;

@Service
@Slf4j
public class DiaryServiceImpl implements DiaryService {

    @Autowired
    @Qualifier("chatClient")
    private WebClient chatClient;
    @Qualifier("sttClient")
    @Autowired
    private WebClient sttClient;
    @Qualifier("ttsClient")
    @Autowired
    private WebClient ttsClient;
    @Qualifier("karloClient")
    @Autowired
    private WebClient karloClient;

    private final DiaryRepository diaryRepository;
    private final FileUploadService fileUploadService;
    private final TalkRepository talkRepository;

    public DiaryServiceImpl(DiaryRepository diaryRepository, FileUploadService fileUploadService,
        TalkRepository talkRepository) {
        this.diaryRepository = diaryRepository;
        this.fileUploadService = fileUploadService;
        this.talkRepository = talkRepository;
    }

    private String getChat(String text) {
        List<MessageDTO> message = new ArrayList<>();
        message.add(new MessageDTO("user", PromptHolder.DEFAULT_PROPMT + text));
        DiaryChatRequestDto reqDto = DiaryChatRequestDto.builder()
            .messages(message)
            .build();
        DiaryChatResponseDto chatResDto = chatClient.post()
            .bodyValue(reqDto)
            .retrieve()
            .bodyToMono(DiaryChatResponseDto.class)
            .block();
        assert chatResDto != null;
        return chatResDto.getContent().get(0).getText();
    }

    private String getStt(MultipartFile mp3File) throws IOException {
        DiarySttResponseDto sttResult = sttClient.post()
            .bodyValue(mp3File.getBytes())
            .retrieve()
            .bodyToMono(DiarySttResponseDto.class)
            .block();
        assert sttResult != null;
        return sttResult.getText();
    }

    private String getTts(String chat, Integer userId) {
        byte[] ttsResult = ttsClient.post()
            .bodyValue(
                "speaker=nara"
                    + "&text=" + chat)
            .retrieve()
            .bodyToMono(byte[].class)
            .block();
        assert ttsResult != null;
        return fileUploadService.voiceUpload(userId, "audio/mpeg", "voice-ai", "mp3",
            ttsResult);
    }


    public DiaryTtsResponseDto init(Integer userId) {
        Diary diary = Diary.builder()
            .diaryContent("init")
            .build();
        Diary newDiary = diaryRepository.save(diary);
        String chatRes = getChat(""); //ai 첫 질문 받아옴
        Talk aiTalk = Talk.builder()
            .talkSpeaker(Speaker.valueOf("AI"))
            .talkContent(chatRes)
            .diary(newDiary)
            .build();
        talkRepository.save(aiTalk);
        String ttsUrl = getTts(chatRes, userId); //ai 발화 음성화
        return new DiaryTtsResponseDto(
            ttsUrl, newDiary.getDiaryId(), false);
    }

    public DiaryTtsResponseDto answer(DiaryAnswerRequestDto reqDto, Integer userId)
        throws IOException {
        fileUploadService.voiceUpload(userId, "audio/mpeg", "voice-user", "mp3",
            reqDto.getFile()); //사용자 발화 s3 bucket 저장
        String sttRes = getStt(reqDto.getFile()); //사용자 발화 텍스트화
        Talk userTalk = Talk.builder()
            .talkSpeaker(Speaker.valueOf("USER"))
            .talkContent(sttRes)
            .diary(diaryRepository.findById(reqDto.getDiaryId())
                .orElseThrow(() -> new IllegalArgumentException("Diary not found")))
            .build();
        talkRepository.save(userTalk); //사용자 발화 db 저장
        String chatRes = getChat(sttRes); //ai 발화 받아옴
        Talk aiTalk = Talk.builder()
            .talkSpeaker(Speaker.valueOf("AI"))
            .talkContent(chatRes)
            .diary(diaryRepository.findById(reqDto.getDiaryId())
                .orElseThrow(() -> new IllegalArgumentException("Diary not found")))
            .build();
        talkRepository.save(aiTalk); //ai 발화 db 저장
        String ttsUrl = getTts(chatRes, userId); //ai 발화 음성화
        return new DiaryTtsResponseDto(
            ttsUrl, reqDto.getDiaryId(), false);
    }

//  public DiaryChatResponseDto chatTest(String prompt) {
//    DiaryChatResponseDto initChat = getChat(prompt);
//    return initChat;
//  }


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

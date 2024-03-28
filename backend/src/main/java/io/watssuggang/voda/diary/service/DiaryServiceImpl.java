package io.watssuggang.voda.diary.service;


import io.watssuggang.voda.common.enums.*;
import io.watssuggang.voda.common.exception.ErrorCode;
import io.watssuggang.voda.diary.domain.*;
import io.watssuggang.voda.diary.dto.req.*;
import io.watssuggang.voda.diary.dto.req.DiaryChatRequestDto.MessageDTO;
import io.watssuggang.voda.diary.dto.req.TalkListRequest.TalkRequest;
import io.watssuggang.voda.diary.dto.res.*;
import io.watssuggang.voda.diary.dto.res.DiaryChatResponseDto.ContentDTO;
import io.watssuggang.voda.diary.exception.DiaryException;
import io.watssuggang.voda.diary.exception.DiaryNotFoundException;
import io.watssuggang.voda.diary.repository.*;
import io.watssuggang.voda.diary.util.PromptHolder;
import io.watssuggang.voda.member.domain.Member;
import io.watssuggang.voda.member.domain.PointLog;
import io.watssuggang.voda.member.exception.MemberNotFoundException;
import io.watssuggang.voda.member.repository.MemberRepository;
import io.watssuggang.voda.member.service.PointLogService;
import io.watssuggang.voda.pet.domain.Pet;
import io.watssuggang.voda.pet.exception.PetException;
import io.watssuggang.voda.pet.repository.PetRepository;
import jakarta.transaction.Transactional;
import java.io.*;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.*;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class DiaryServiceImpl implements DiaryService {

    @Qualifier("chatClient")
    private final WebClient chatClient;

    @Qualifier("sttClient")
    private final WebClient sttClient;

    @Qualifier("ttsClient")
    private final WebClient ttsClient;

    @Qualifier("karloClient")
    private final WebClient karloClient;

    private final DiaryRepository diaryRepository;
    private final FileUpdateService fileUpdateService;
    private final DiaryFileRepository diaryFileRepository;
    private final TalkRepository talkRepository;
    private final MemberRepository memberRepository;
    private final PetRepository petRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private final String terminateDiaryUrl = "https://voda-bucket.s3.ap-northeast-2.amazonaws.com/voice-place-holder/terminateDiary.mp3";
    private final String nullAnswerUrl = "https://voda-bucket.s3.ap-northeast-2.amazonaws.com/voice-place-holder/nullAnswer.mp3";
    private final String initPrefix = "today:";
    private final String answerPrefix = "chatCount:";
    private final PointLogService pointLogService;

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
        return fileUpdateService.fileUpload(userId, "audio/mpeg", "voice-ai", "mp3",
            ttsResult); // ai 발화 s3 bucket 저장
    }


    public void addFileToDiary(int diaryId, FileType fileType, String fileUrl) {
        Diary diary = diaryRepository.findById(diaryId).orElseThrow(DiaryNotFoundException::new);
        DiaryFile newFile = DiaryFile.builder()
                .fileType(fileType) // 새 파일의 타입 설정
                .fileUrl(fileUrl) // 새 파일의 URL 설정
                .build();
        diaryFileRepository.save(newFile);
        diary.addFile(newFile);
    }

    public DiaryTtsResponseDto init(Integer userId) {
        Integer value = (Integer) redisTemplate.opsForValue().get(initPrefix+userId);
        if(value != null && value >= 100) {
            return new DiaryTtsResponseDto(null, null, true);
        }
        redisTemplate.opsForValue().increment(initPrefix+userId, 1);
        Diary diary = Diary.builder()
            .diaryContent("init")
            .diaryEmotion(Emotion.NONE)
            .build();
        Diary newDiary = diaryRepository.save(diary);
        String chatRes = getChat(""); //ai 첫 질문 받아옴
        log.info("init chat : " + chatRes);
        Talk aiTalk = Talk.builder()
                .talkSpeaker(Speaker.valueOf("AI"))
                .talkContent(chatRes)
                .diary(newDiary)
                .build();
        talkRepository.save(aiTalk); //ai 발화 db 저장
        String ttsUrl = getTts(chatRes, userId); //ai 발화 음성화
        addFileToDiary(newDiary.getDiaryId(), FileType.MP3, ttsUrl); //ttsUrl db 저장
        return new DiaryTtsResponseDto(
                ttsUrl, newDiary.getDiaryId(), false);
    }
    //TODO: 자정에 today redis 초기화시키기 작동하는지 확인
    public DiaryTtsResponseDto answer(MultipartFile file, Integer diaryId, Integer userId)
        throws IOException {
        Integer value = (Integer) redisTemplate.opsForValue().get(answerPrefix+userId);
        if(value != null && value > 10) {
            return new DiaryTtsResponseDto(terminateDiaryUrl, diaryId, true); //"일기 작성을 종료할게요" 반환
        }
        redisTemplate.opsForValue().increment(answerPrefix+userId, 1);
        String sttUrl = fileUpdateService.fileUpload(userId, "audio/mpeg", "voice-user", "mp3",
            file); //사용자 발화 s3 bucket 저장
        addFileToDiary(diaryId, FileType.MP3, sttUrl); //sttUrl db 저장
        String sttRes = getStt(file); //사용자 발화 텍스트화
        log.info("user chat : " + sttRes);
        String sttResShort = sttRes.trim().replaceAll("\\s+", "");
        if (sttResShort.contains("오늘일기끝") || sttResShort.contains("오늘의일기끝")) {
            return new DiaryTtsResponseDto(terminateDiaryUrl, diaryId, true); //"일기 작성을 종료할게요" 반환
        }
        if (sttRes.equals("")) {
            return new DiaryTtsResponseDto(nullAnswerUrl, diaryId, false); //"말씀이 잘 안들려요" 반환
        }
        Talk userTalk = Talk.builder()
                .talkSpeaker(Speaker.valueOf("USER"))
                .talkContent(sttRes)
                .diary(diaryRepository.findById(diaryId).orElseThrow(DiaryNotFoundException::new))
                .build();
        talkRepository.save(userTalk); //사용자 발화 db 저장
        String chatRes = getChat(sttRes); //ai 발화 받아옴
        log.info("ai chat : " + chatRes);
        Talk aiTalk = Talk.builder()
                .talkSpeaker(Speaker.valueOf("AI"))
                .talkContent(chatRes)
                .diary(diaryRepository.findById(diaryId).orElseThrow(DiaryNotFoundException::new))
                .build();
        talkRepository.save(aiTalk); //ai 발화 db 저장
        String ttsUrl = getTts(chatRes, userId); //ai 발화 음성화
        addFileToDiary(diaryId, FileType.MP3, ttsUrl); //ttsUrl db 저장
        return new DiaryTtsResponseDto(
                ttsUrl, diaryId, false);
    }

    @Override
    public ResponseEntity<Void> terminate(Integer diaryId, Integer userId) {
        try {
            // s3 삭제
            fileUpdateService.fileDelete(diaryId);
            // diary db 삭제
            diaryRepository.deleteById(diaryId);
            // redis chatCnt 초기화
            redisTemplate.delete(answerPrefix + userId);
            // 3개 모두 성공시 200 반환
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
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
    public Map<String, Object> getChatList(int id, Integer memberId) {
        List<Talk> talks = talkRepository.findAllByDiary_DiaryId(id);

        Optional<Integer> writerId = talks.stream().map(Talk::getWriter).findFirst();

        if (writerId.isPresent() && isUnAuthorized(writerId.get(), memberId)) {
            throw new DiaryException(ErrorCode.TALK_READ_UNAUTHORIZED);
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
    public DiaryCreateResponse createDiary(List<TalkRequest> talkList, int diaryId,
            Integer memberId) {

        Member writer = memberRepository.findById(memberId)
                .orElseThrow(MemberNotFoundException::new);

        Diary existedDiary = diaryRepository.findById(diaryId)
                .orElseThrow(DiaryNotFoundException::new);

        if (isUnAuthorized(existedDiary.getWriter(), memberId)) {
            throw new DiaryException(ErrorCode.DIARY_CREATE_UNAUTHORIZED);
        }

        String allAnswers = talkList.stream()
                .map(TalkListRequest.TalkRequest::getAnswer) // Talk 객체에서 answer만 추출
                .collect(Collectors.joining(". ")); // 공백으로 각 answer를 구분하여 이어 붙임

        log.info("합친 답변: " + allAnswers);

        ContentDTO completedDiary = callClaude(allAnswers);

        String answerText = completedDiary != null ? completedDiary.getText() : null;

        if (answerText == null) {
            throw new DiaryException(ErrorCode.DIARY_CONTENT_NOT_CREATED);
        }

        log.info("---Claude의 답변---");
        log.info(answerText);

        JSONObject jsonObject = new JSONObject(answerText);
        String title = jsonObject.getString("title");
        String content = jsonObject.getString("content");
        String emotion = jsonObject.getString("emotion");
        String imagePrompt = jsonObject.getString("prompt") + ", cartoon";

        existedDiary.updateDiary(title, Emotion.valueOf(emotion), content);

        existedDiary.addMember(writer);

        createImage(KarloRequest.of(imagePrompt))
            .getImages()
            .forEach(imageResponse -> {
                String image = fileUpdateService.fileUpload(
                    existedDiary.getMember().getMemberId(),
                    MediaType.IMAGE_JPEG_VALUE,
                    "image",
                    "jpeg",
                    getImage(imageResponse));

                    DiaryFile savedImage = diaryFileRepository.save(DiaryFile.builder()
                            .fileType(FileType.WEBP)
                            .fileUrl(image)
                            .build());
                    savedImage.addDiary(existedDiary);
                });

        Diary save = diaryRepository.save(existedDiary);
        // 펫의 Exp 올려주기
        Pet pet = petRepository.findByMember_MemberId(memberId)
                .orElseThrow(() -> new PetException(ErrorCode.PET_NOT_FOUND));
        pet.updateExp((byte) 5);
        // redis에 저장된 대화 횟수 삭제하기
        redisTemplate.delete(answerPrefix + memberId);

        pet.getMember().increasePoint(10);

        pointLogService.makePointLog(
                PointLog.ofEarnPointLog(pet.getMember(), 20, "일기")
        );

        return DiaryCreateResponse.of(save.getDiaryId(), "일기 생성 완료");
    }

    private static byte[] getImage(ImageResponse imageResponse) {
        try {
            URL url = new URL(imageResponse.getImage());
            try (InputStream inputStream = url.openStream();
                    ByteArrayOutputStream buffer = new ByteArrayOutputStream()) {
                int bytesRead;
                byte[] data = new byte[1024];
                while ((bytesRead = inputStream.read(data, 0, data.length)) != -1) {
                    buffer.write(data, 0, bytesRead);
                }
                return buffer.toByteArray();
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        //TODO:  이미지 생성 로직 예외처리
        // throw new DiaryNotCreatedException(ErrorCode.DIARY_IMAGE_NOT_CREATED);

    }

    @Override
    public DiaryDetailResponse getDiaryDetail(Integer memberId, int diaryId) {

        Diary diary = diaryRepository.findById(diaryId).orElseThrow(DiaryNotFoundException::new);

        if (isUnAuthorized(diary.getWriter(), memberId)) {
            throw new DiaryException(ErrorCode.DIARY_CREATE_UNAUTHORIZED);
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
            throw new DiaryException(ErrorCode.DIARY_READ_UNAUTHORIZED);
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

    // redis의 today 일기 작성 횟수 초기화
    @Override
    @Transactional
    public void deleteKeysWithToday(){

        ScanOptions scanOptions = ScanOptions.scanOptions().match(initPrefix+"*").build();

        List<String> keysToDelete = new ArrayList<>();
        redisTemplate.execute((RedisCallback<Void>) connection -> {
            Cursor<byte[]> cursor = connection.scan(scanOptions);
            while (cursor.hasNext()) {
                keysToDelete.add(new String(cursor.next()));
            }
            return null;
        });

        if (!keysToDelete.isEmpty()) {
            redisTemplate.delete(keysToDelete);
        }
    }

}

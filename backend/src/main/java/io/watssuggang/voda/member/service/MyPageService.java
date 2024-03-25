package io.watssuggang.voda.member.service;

import io.watssuggang.voda.common.enums.Emotion;
import io.watssuggang.voda.diary.domain.Diary;
import io.watssuggang.voda.diary.dto.req.DiaryChatRequestDto;
import io.watssuggang.voda.diary.dto.req.DiaryChatRequestDto.MessageDTO;
import io.watssuggang.voda.diary.dto.res.DiaryChatResponseDto;
import io.watssuggang.voda.diary.repository.DiaryRepository;
import io.watssuggang.voda.diary.util.PromptHolder;
import io.watssuggang.voda.member.domain.Member;
import io.watssuggang.voda.member.dto.DailyStaticDto;
import io.watssuggang.voda.member.dto.res.EmotionReportResponse;
import io.watssuggang.voda.member.dto.res.MemberInfoResponse;
import io.watssuggang.voda.member.repository.MemberRepository;
import io.watssuggang.voda.pet.domain.Pet;
import io.watssuggang.voda.pet.repository.PetRepository;
import java.time.DayOfWeek;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
@Slf4j
public class MyPageService {

    private final MemberRepository memberRepository;
    private final DiaryRepository diaryRepository;
    private final PetRepository petRepository;
    private final WebClient chatClient;

    @Transactional(readOnly = true)
    public MemberInfoResponse getMemberInfo(Integer memberId) {
        Member member = findMemberById(memberId);

        return MemberInfoResponse.builder()
            .nickname(member.getMemberName())
            .coins(member.getMemberPoint())
            .diaryStreak(member.getMemberDiaryCount())
            .build();
    }

    @Transactional
    public MemberInfoResponse updateMemberInfo(Integer memberId, String newNickname) {
        Member member = findMemberById(memberId);

        member.setMemberName(newNickname);

        return MemberInfoResponse.builder()
            .nickname(newNickname)
            .coins(member.getMemberPoint())
            .diaryStreak(member.getMemberDiaryCount())
            .build();
    }

    @Transactional
    public void deleteMember(Integer memberId) {
        memberRepository.deleteById(memberId);
    }

    @Transactional(readOnly = true)
    public EmotionReportResponse getEmotionReport(Integer memberId) {
        List<Diary> diaries = diaryRepository.findAllByMemberAndCreatedAtAfterCurrentMonth(
            memberId);

        // 이번 달에 작성한 일기 개수
        int diaryCount = diaries.size();

        // 작성한 일기의 감정 비율 계산
        Map<Emotion, Double> emotionRatio = getEmotionRatio(diaries, diaryCount);

        // 각 요일 별로 가장 많이 등장한 감정 그룹에 속한 일기들만 추출
        Map<DayOfWeek, List<Diary>> weekDayDiaries = getWeekDayMap(diaries);
        Map<DayOfWeek, DailyStaticDto> weeklyStatics = createWeeklyStatics(weekDayDiaries);

        // 펫 이름 가져오기
        String petName = getPetName(memberId);

        // dto 만들어서 반환
        return EmotionReportResponse.createResponse()
            .diaryCountOf(diaryCount)
            .emotionStaticsOf(emotionRatio)
            .weeklyStaticsOf(weeklyStatics)
            .petNameOf(petName);
    }

    /**
     * 요일 별로 추출된, 가장 많이 등장한 감정 그룹에 속한 일기들에 대한 감정과 요약을 생성
     *
     * @param weekDayDiaries
     * @return
     */
    private Map<DayOfWeek, DailyStaticDto> createWeeklyStatics(
        Map<DayOfWeek, List<Diary>> weekDayDiaries) {

        return Arrays.stream(DayOfWeek.values())
            .filter(
                dayOfWeek -> weekDayDiaries.containsKey(dayOfWeek) && !weekDayDiaries.get(dayOfWeek)
                    .isEmpty())
            .collect(Collectors.toMap(Function.identity(),
                dayOfWeek -> createDailyStatic(weekDayDiaries.get(dayOfWeek))));
    }

    /**
     * 요일별 감정과 대표 문장 추출
     *
     * @param diaries
     * @return
     */
    private DailyStaticDto createDailyStatic(List<Diary> diaries) {
        // 대표 감정
        Emotion emotion = diaries.get(0).getDiaryEmotion();

        String allContents = "\"" + diaries.stream()
            .map(Diary::getDiaryContent)
            .collect(Collectors.joining(". ")) + "\"";

        // 요약본
        String summary = getSummary(emotion, allContents);

        return DailyStaticDto.builder()
            .emotion(emotion)
            .summary(summary)
            .build();
    }

    /**
     * 일기 내용들에서 대표 문장 하나를 뽑음
     *
     * @param emotion
     * @param allContents
     * @return
     */
    private String getSummary(Emotion emotion, String allContents) {
        log.info("일기 종합 내용: " + allContents);

        List<MessageDTO> messages = new ArrayList<>();
        messages.add(
            new MessageDTO("user", PromptHolder.diarySummaryPrompt(emotion.name()) + allContents));
        DiaryChatRequestDto req = DiaryChatRequestDto.builder().messages(messages).build();

        DiaryChatResponseDto response = chatClient.post()
            .uri("https://api.anthropic.com/v1/messages")
            .bodyValue(req)
            .retrieve()
            .bodyToMono(DiaryChatResponseDto.class)
            .block();

        return response != null ? response.getContent().get(0).getText() : null;
    }

    /**
     * 이번 달에 쓴 일기들에 포함된 감정들의 비율을 계산
     *
     * @param diaries
     * @param diaryCount
     * @return
     */
    private Map<Emotion, Double> getEmotionRatio(List<Diary> diaries, int diaryCount) {
        return diaries.stream()
            .collect(Collectors.groupingBy(Diary::getDiaryEmotion,
                Collectors.collectingAndThen(Collectors.counting(),
                    count -> count / (double) diaryCount)));
    }

    private String getPetName(Integer memberId) {
        Pet pet = petRepository.findByMember_MemberId(memberId).orElseThrow(RuntimeException::new);
        return pet.getPetName();
    }

    /**
     * 요일별로 가장 많은 감정 그룹에 포함된 일기들만 필터링
     *
     * @param diaries
     * @return
     */
    private Map<DayOfWeek, List<Diary>> getWeekDayMap(List<Diary> diaries) {
        return diaries.stream()
            .collect(Collectors.groupingBy(this::getDayOfWeek)).entrySet().stream()
            .collect(Collectors.toMap(Map.Entry::getKey, entry -> entry.getValue().stream()
                .collect(Collectors.groupingBy(Diary::getDiaryEmotion)).values().stream()
                .max(Comparator.comparingInt(List::size))
                .orElse(Collections.emptyList())));
    }

    private DayOfWeek getDayOfWeek(Diary diary) {
        return diary.getCreatedAt().getDayOfWeek();
    }

    private Member findMemberById(Integer memberId) {
        return memberRepository.findById(memberId)
            .orElseThrow(() -> new RuntimeException("회원 정보 없음"));
    }
}

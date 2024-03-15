package io.watssuggang.voda.member.service;

import io.watssuggang.voda.common.enums.Emotion;
import io.watssuggang.voda.diary.domain.Diary;
import io.watssuggang.voda.diary.repository.DiaryRepository;
import io.watssuggang.voda.member.domain.Member;
import io.watssuggang.voda.member.dto.DailyStaticDto;
import io.watssuggang.voda.member.dto.res.EmotionReportResponse;
import io.watssuggang.voda.member.dto.res.MemberInfoResponse;
import io.watssuggang.voda.member.repository.MemberRepository;
import io.watssuggang.voda.pet.domain.Pet;
import io.watssuggang.voda.pet.repository.PetRepository;
import java.time.DayOfWeek;
import java.util.*;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MyPageService {

    private final MemberRepository memberRepository;
    private final DiaryRepository diaryRepository;
    private final PetRepository petRepository;

    @Transactional
    public MemberInfoResponse updateMemberInfo(Integer memberId, String newNickname) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new RuntimeException("회원 정보 없음"));
        member.setMemberName(newNickname);

        return new MemberInfoResponse(newNickname);
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
        Integer diaryCount = diaries.size();

        // 작성한 일기의 감정 비율 계산
        Map<Emotion, Double> emotionRatio = getEmotionRatio(diaries, diaryCount);

        // 각 요일 별로 가장 많이 등장한 감정 그룹에 속한 일기들만 추출
        Map<DayOfWeek, List<Diary>> weekDayDiaries = getWeekDayMap(diaries);
        // TODO: 외부 api한테 넘기는 게 필요
        Map<DayOfWeek, DailyStaticDto> weeklyStatics = new HashMap<>();

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
}

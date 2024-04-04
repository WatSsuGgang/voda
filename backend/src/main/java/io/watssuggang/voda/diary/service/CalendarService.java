package io.watssuggang.voda.diary.service;

import io.watssuggang.voda.diary.domain.Diary;
import io.watssuggang.voda.diary.dto.res.DailyDiaryResDto;
import io.watssuggang.voda.diary.dto.res.MonthlyDiariesResDto;
import io.watssuggang.voda.diary.repository.DiaryRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CalendarService {

    private final DiaryRepository diaryRepository;

    public MonthlyDiariesResDto getMonthlyDiaries(Integer memberId, Integer month,
        Integer year) {
        month = checkValidMonth(month);
        year = checkValidYear(year);

        List<Diary> diaries = diaryRepository.findAllByMemberAndCreatedAtGivenMonthAndYear(memberId,
            month,
            year);

        return new MonthlyDiariesResDto(year, month, diaries);
    }

    private Integer checkValidMonth(Integer month) {
        if (month == null || month < 1 || month > 12) {
            month = LocalDateTime.now().getMonthValue();
        }

        return month;
    }

    private Integer checkValidYear(Integer year) {
        if (year == null || year < 2023) {
            year = LocalDateTime.now().getYear();
        }

        return year;
    }

    public DailyDiaryResDto getDailyDiary(Integer memberId, LocalDate date) {
        List<Diary> diaries = diaryRepository.findAllByMemberAndCreatedAtGivenDate(memberId,
            date.getDayOfMonth(), date.getMonthValue(), date.getYear());

        return new DailyDiaryResDto(diaries);
    }
}

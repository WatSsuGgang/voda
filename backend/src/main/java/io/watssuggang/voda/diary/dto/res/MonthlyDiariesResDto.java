package io.watssuggang.voda.diary.dto.res;

import io.watssuggang.voda.diary.domain.Diary;
import io.watssuggang.voda.diary.dto.DailyInfoDto;
import java.util.ArrayList;
import java.util.List;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class MonthlyDiariesResDto {

    Integer year;
    Integer month;
    List<DailyInfoDto> calendar;

    public MonthlyDiariesResDto(Integer year, Integer month, List<Diary> diaries) {
        this.year = year;
        this.month = month;

        calendar = new ArrayList<>();

        for (int i = 1; i <= 31; ++i) {
            int day = i;

            List<Diary> diaryList = diaries.stream()
                .filter(d -> d.getCreatedAt().getDayOfMonth() == day).toList();

            if (!diaryList.isEmpty()) {
                calendar.add(new DailyInfoDto(day, diaryList));
            }
        }
    }
}

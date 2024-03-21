package io.watssuggang.voda.member.dto.res;

import io.watssuggang.voda.common.enums.Emotion;
import io.watssuggang.voda.member.dto.*;
import java.time.DayOfWeek;
import java.util.Map;
import lombok.*;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class EmotionReportResponse {

    private Integer diaryCount;
    private EmotionStaticsDto emotionStatics;
    private WeeklyStaticsDto weeklyStatics;
    private String petName;

    public static EmotionReportResponse createResponse() {
        return new EmotionReportResponse();
    }

    public EmotionReportResponse emotionStaticsOf(Map<Emotion, Double> emotionRatio) {
        this.emotionStatics = EmotionStaticsDto.builder()
            .joy(emotionRatio.get(Emotion.JOY))
            .anger(emotionRatio.get(Emotion.ANGER))
            .sadness(emotionRatio.get(Emotion.SADNESS))
            .fear(emotionRatio.get(Emotion.FEAR))
            .curiosity(emotionRatio.get(Emotion.CURIOSITY))
            .build();
        return this;
    }

    public EmotionReportResponse weeklyStaticsOf(
        Map<DayOfWeek, DailyStaticDto> weeklyStatics) {
        this.weeklyStatics = WeeklyStaticsDto.createInstance()
            .mondayOf(weeklyStatics.get(DayOfWeek.MONDAY))
            .tuesdayOf(weeklyStatics.get(DayOfWeek.TUESDAY))
            .wednesdayOf(weeklyStatics.get(DayOfWeek.WEDNESDAY))
            .thursdayOf(weeklyStatics.get(DayOfWeek.WEDNESDAY))
            .fridayOf(weeklyStatics.get(DayOfWeek.FRIDAY))
            .saturdayOf(weeklyStatics.get(DayOfWeek.SATURDAY))
            .sundayOf(weeklyStatics.get(DayOfWeek.SUNDAY));
        return this;
    }

    public EmotionReportResponse diaryCountOf(Integer diaryCount) {
        this.diaryCount = diaryCount;
        return this;
    }

    public EmotionReportResponse petNameOf(String petName) {
        this.petName = petName;
        return this;
    }
}

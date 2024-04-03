package io.watssuggang.voda.member.dto.res;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @JsonIgnore
    private static final DailyStaticDto defaultDailyStatic = DailyStaticDto.builder()
        .emotion(Emotion.NONE).summary("").build();

    public static EmotionReportResponse createResponse() {
        return new EmotionReportResponse();
    }

    public EmotionReportResponse emotionStaticsOf(Map<Emotion, Double> emotionRatio) {
        this.emotionStatics = EmotionStaticsDto.builder()
            .joy(convertNullRatio(emotionRatio.get(Emotion.JOY)))
            .anger(convertNullRatio(emotionRatio.get(Emotion.ANGER)))
            .sadness(convertNullRatio(emotionRatio.get(Emotion.SADNESS)))
            .fear(convertNullRatio(emotionRatio.get(Emotion.FEAR)))
            .curiosity(convertNullRatio(emotionRatio.get(Emotion.CURIOSITY)))
            .build();
        return this;
    }

    public EmotionReportResponse weeklyStaticsOf(
        Map<DayOfWeek, DailyStaticDto> weeklyStatics) {
        this.weeklyStatics = WeeklyStaticsDto.createInstance()
            .mondayOf(convertNullDailyStatic(weeklyStatics.get(DayOfWeek.MONDAY)))
            .tuesdayOf(convertNullDailyStatic(weeklyStatics.get(DayOfWeek.TUESDAY)))
            .wednesdayOf(convertNullDailyStatic(weeklyStatics.get(DayOfWeek.WEDNESDAY)))
            .thursdayOf(convertNullDailyStatic(weeklyStatics.get(DayOfWeek.THURSDAY)))
            .fridayOf(convertNullDailyStatic(weeklyStatics.get(DayOfWeek.FRIDAY)))
            .saturdayOf(convertNullDailyStatic(weeklyStatics.get(DayOfWeek.SATURDAY)))
            .sundayOf(convertNullDailyStatic(weeklyStatics.get(DayOfWeek.SUNDAY)));
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

    private Double convertNullRatio(Double ratio) {
        return ratio == null ? 0.0 : ratio;
    }

    private DailyStaticDto convertNullDailyStatic(DailyStaticDto dailyStatic) {
        return dailyStatic == null ? defaultDailyStatic : dailyStatic;
    }
}

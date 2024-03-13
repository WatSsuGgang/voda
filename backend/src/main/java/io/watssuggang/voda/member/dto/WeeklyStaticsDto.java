package io.watssuggang.voda.member.dto;

import io.watssuggang.voda.common.enums.Emotion;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
public class WeeklyStaticsDto {

    private DailyStatic sunday;
    private DailyStatic monday;
    private DailyStatic tuesday;
    private DailyStatic wednesday;
    private DailyStatic thursday;
    private DailyStatic friday;
    private DailyStatic saturday;

    @Getter
    @AllArgsConstructor
    @Builder
    static class DailyStatic {

        private Emotion emotion;
        private String summary;
    }
}

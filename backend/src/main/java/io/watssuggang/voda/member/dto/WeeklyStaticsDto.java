package io.watssuggang.voda.member.dto;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class WeeklyStaticsDto {

    private DailyStaticDto sunday;
    private DailyStaticDto monday;
    private DailyStaticDto tuesday;
    private DailyStaticDto wednesday;
    private DailyStaticDto thursday;
    private DailyStaticDto friday;
    private DailyStaticDto saturday;

    public static WeeklyStaticsDto createInstance() {
        return new WeeklyStaticsDto();
    }

    public WeeklyStaticsDto sundayOf(DailyStaticDto sunday) {
        if (sunday != null) {
            this.sunday = DailyStaticDto.builder()
                .emotion(sunday.getEmotion())
                .summary(sunday.getSummary())
                .build();
        }
        return this;
    }

    public WeeklyStaticsDto mondayOf(DailyStaticDto monday) {
        if (monday != null) {
            this.monday = DailyStaticDto.builder()
                .emotion(monday.getEmotion())
                .summary(monday.getSummary())
                .build();
        }
        return this;
    }

    public WeeklyStaticsDto tuesdayOf(DailyStaticDto tuesday) {
        if (tuesday != null) {
            this.tuesday = DailyStaticDto.builder()
                .emotion(tuesday.getEmotion())
                .summary(tuesday.getSummary())
                .build();
        }
        return this;
    }

    public WeeklyStaticsDto wednesdayOf(DailyStaticDto wednesday) {
        if (wednesday != null) {
            this.wednesday = DailyStaticDto.builder()
                .emotion(wednesday.getEmotion())
                .summary(wednesday.getSummary())
                .build();
        }
        return this;
    }

    public WeeklyStaticsDto thursdayOf(DailyStaticDto thursday) {
        if (thursday != null) {
            this.thursday = DailyStaticDto.builder()
                .emotion(thursday.getEmotion())
                .summary(thursday.getSummary())
                .build();
        }
        return this;
    }

    public WeeklyStaticsDto fridayOf(DailyStaticDto friday) {
        if (friday != null) {
            this.friday = DailyStaticDto.builder()
                .emotion(friday.getEmotion())
                .summary(friday.getSummary())
                .build();
        }
        return this;
    }

    public WeeklyStaticsDto saturdayOf(DailyStaticDto saturday) {
        if (saturday != null) {
            this.saturday = DailyStaticDto.builder()
                .emotion(saturday.getEmotion())
                .summary(saturday.getSummary())
                .build();
        }
        return this;
    }
}

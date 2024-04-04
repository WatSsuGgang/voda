package io.watssuggang.voda.common.util;

import java.time.*;

public class DateUtil {

    public static boolean AfterTodayMidNight(LocalDateTime time) {
        LocalDateTime midNight = getTodayDate();

        return time.isAfter(midNight);
    }

    public static LocalDateTime getTodayDate() {
        return LocalDateTime.of(LocalDate.now(), LocalTime.MIDNIGHT);
    }
}

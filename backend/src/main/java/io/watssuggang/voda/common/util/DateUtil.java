package io.watssuggang.voda.common.util;

import java.time.*;

public class DateUtil {

    public static boolean AfterMidNight(LocalDateTime lastFeed) {
        LocalDateTime midNight = getTodayDate();

        return lastFeed.isBefore(midNight);
    }

    public static LocalDateTime getTodayDate(){
        return LocalDateTime.of(LocalDate.now(), LocalTime.MIDNIGHT);
    }
}

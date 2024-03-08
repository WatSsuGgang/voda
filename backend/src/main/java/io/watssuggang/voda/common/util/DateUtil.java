package io.watssuggang.voda.common.util;

import java.time.*;

public class DateUtil {

    public static boolean AfterMidNight(LocalDateTime lastFeed) {
        LocalDateTime midNight = LocalDateTime.of(LocalDate.now(), LocalTime.MIDNIGHT);

        return lastFeed.isBefore(midNight);
    }
}

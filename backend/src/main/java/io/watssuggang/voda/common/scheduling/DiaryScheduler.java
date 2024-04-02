package io.watssuggang.voda.common.scheduling;

import io.watssuggang.voda.diary.service.DiaryService;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class DiaryScheduler {

    private final DiaryService diaryService;

    /**
     * 사용자가 하루에 일기를 쓴 횟수를 매일 자정에 초기화
     */

    @Scheduled(cron = "0 0 0 * * *")
    public void deleteKeysWithTodaySchedule() {
        diaryService.deleteKeysWithToday();
        log.info("delete Keys With Today" + LocalDateTime.now());
    }
}

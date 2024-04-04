package io.watssuggang.voda.diary.controller;

import io.watssuggang.voda.common.security.annotation.CurrentUser;
import io.watssuggang.voda.common.security.dto.SecurityUserDto;
import io.watssuggang.voda.diary.dto.req.MonthlyDiariesReqDto;
import io.watssuggang.voda.diary.dto.res.DailyDiaryResDto;
import io.watssuggang.voda.diary.dto.res.MonthlyDiariesResDto;
import io.watssuggang.voda.diary.service.CalendarService;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/calendar")
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarService calendarService;

    @GetMapping
    public ResponseEntity<?> getMonthlyDiaries(@CurrentUser SecurityUserDto currentUser,
        MonthlyDiariesReqDto params) {
        MonthlyDiariesResDto response = calendarService.getMonthlyDiaries(currentUser.getMemberId(),
            params.getMonth(), params.getYear());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{date}")
    public ResponseEntity<?> getDailyDiary(@CurrentUser SecurityUserDto currentUser,
        @PathVariable @DateTimeFormat(pattern = "yyMMdd") LocalDate date) {
        DailyDiaryResDto response = calendarService.getDailyDiary(currentUser.getMemberId(), date);
        return ResponseEntity.ok(response);
    }

}

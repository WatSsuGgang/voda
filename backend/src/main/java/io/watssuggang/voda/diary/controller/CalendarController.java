package io.watssuggang.voda.diary.controller;

import io.watssuggang.voda.common.security.annotation.CurrentUser;
import io.watssuggang.voda.common.security.dto.SecurityUserDto;
import io.watssuggang.voda.diary.dto.req.MonthlyDiariesReqDto;
import io.watssuggang.voda.diary.dto.res.MonthlyDiariesResDto;
import io.watssuggang.voda.diary.service.CalendarService;
import lombok.RequiredArgsConstructor;
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
        MonthlyDiariesResDto response = calendarService.getMonthlyDiaries(1,
            params.getMonth(), params.getYear());

        return ResponseEntity.ok(response);
    }

}

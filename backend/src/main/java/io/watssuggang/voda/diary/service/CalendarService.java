package io.watssuggang.voda.diary.service;

import io.watssuggang.voda.common.security.dto.SecurityUserDto;
import io.watssuggang.voda.diary.dto.req.MonthlyDiariesReqDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class CalendarService {


    public MonthlyDiariesReqDto getMonthlyDiaries(SecurityUserDto currentUser, Integer month,
        Integer year) {
        return null;
    }
}

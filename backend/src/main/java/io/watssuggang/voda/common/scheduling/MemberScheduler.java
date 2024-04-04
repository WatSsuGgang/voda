package io.watssuggang.voda.common.scheduling;

import io.watssuggang.voda.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class MemberScheduler {

    private final MemberService memberService;

    /**
     * 사용자가 일기를 연속으로 쓴 일수를 매일 자정에 업데이트
     */
    @Scheduled(cron = "0 0 0 * * *")
    public void updateMemberCountSchedule() {
        memberService.updateMemberCount();
        log.info("update member count");
    }
}

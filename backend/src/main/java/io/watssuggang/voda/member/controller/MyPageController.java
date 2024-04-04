package io.watssuggang.voda.member.controller;

import io.watssuggang.voda.common.security.annotation.CurrentUser;
import io.watssuggang.voda.common.security.dto.SecurityUserDto;
import io.watssuggang.voda.member.dto.req.UpdateMemberInfoRequest;
import io.watssuggang.voda.member.dto.res.EmotionReportResponse;
import io.watssuggang.voda.member.dto.res.MemberInfoResponse;
import io.watssuggang.voda.member.service.MyPageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Validated
public class MyPageController {

    private final MyPageService myPageService;

    @GetMapping
    public ResponseEntity<?> getMemberInfo(@CurrentUser SecurityUserDto currentUser) {
        MemberInfoResponse response = myPageService.getMemberInfo(currentUser.getMemberId());

        return ResponseEntity.ok(response);
    }

    @PatchMapping
    public ResponseEntity<?> updateMemberInfo(@CurrentUser SecurityUserDto currentUser,
        @Valid @RequestBody UpdateMemberInfoRequest req) {
        MemberInfoResponse response = myPageService.updateMemberInfo(currentUser.getMemberId(),
            req.getNewNickname());

        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteMember(@CurrentUser SecurityUserDto currentUser) {
        myPageService.deleteMember(currentUser.getMemberId());

        return ResponseEntity.ok().build();
    }

    @GetMapping("/report")
    public ResponseEntity<?> getEmotionReport(@CurrentUser SecurityUserDto currentUser) {
        EmotionReportResponse response = myPageService.getEmotionReport(currentUser.getMemberId());
        return ResponseEntity.ok(response);
    }
}

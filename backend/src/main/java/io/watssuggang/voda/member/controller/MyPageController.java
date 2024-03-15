package io.watssuggang.voda.member.controller;

import io.watssuggang.voda.member.dto.req.UpdateMemberInfoRequest;
import io.watssuggang.voda.member.dto.res.EmotionReportResponse;
import io.watssuggang.voda.member.dto.res.MemberInfoResponse;
import io.watssuggang.voda.member.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

// TODO: JWT를 이용한 로그인 구현이 완료된 후, 각 메소드에서 Authentication 객체를 통해 유저를 특정 지을 것

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Validated
public class MyPageController {

    private final MyPageService myPageService;

    @GetMapping
    public ResponseEntity<?> getMemberInfo() throws Exception {
        // TODO: jwt에 있는 값을 바로 리턴하고, 필요 시 Authentication에서 id을 읽어와서 동작하도록 수정
        String nickname = "nickname";

        return ResponseEntity.ok(nickname);
    }

    @PatchMapping
    public ResponseEntity<?> updateMemberInfo(UpdateMemberInfoRequest req) throws Exception {
        // TODO: Authentication에서 id를 읽어와서 동작하도록 수정
        Integer memberId = 0;
        MemberInfoResponse response = myPageService.updateMemberInfo(memberId,
            req.getNewNickname());

        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteMember() throws Exception {
        // TODO: Authentication에서 id를 읽어와서 동작하도록 수정
        Integer memberId = 0;

        myPageService.deleteMember(memberId);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/report")
    public ResponseEntity<?> getEmotionReport() throws Exception {
        // TODO: Authentication에서 id를 읽어와서 동작하도록 수정
        Integer memberId = 1;

        EmotionReportResponse response = myPageService.getEmotionReport(memberId);
        return ResponseEntity.ok(response);
    }
}

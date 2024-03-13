package io.watssuggang.voda.member.controller;

import io.watssuggang.voda.member.dto.req.UpdateUserInfoRequest;
import io.watssuggang.voda.member.dto.res.UserInfoResponse;
import io.watssuggang.voda.member.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// TODO: JWT를 이용한 로그인 구현이 완료된 후, 각 메소드에서 Authentication 객체를 통해 유저를 특정 지을 것

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Validated
public class MyPageController {

    private final MyPageService myPageService;

    @GetMapping
    public ResponseEntity<?> getUserInfo() {
        // TODO: jwt에 있는 값을 바로 리턴하고, 필요 시 Authentication에서 id을 읽어와서 동작하도록 수정
        String userEmail = "test@ssafy.com";

        UserInfoResponse response = myPageService.getUserInfo(userEmail);

        return ResponseEntity.ok(response);
    }

    @PatchMapping
    public ResponseEntity<?> updateUserInfo(UpdateUserInfoRequest req) {
        // TODO: Authentication에서 id를 읽어와서 동작하도록 수정
        Integer memberId = 0;
        UserInfoResponse response = myPageService.updateUserInfo(memberId, req.getNewNickname());

        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteUser() {
        // TODO: Authentication에서 id를 읽어와서 동작하도록 수정
        Integer memberId = 0;

        myPageService.deleteUser(memberId);

        return ResponseEntity.ok().build();
    }
}

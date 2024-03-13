package io.watssuggang.voda.member.controller;

import io.watssuggang.voda.member.dto.res.UserInfoResponse;
import io.watssuggang.voda.member.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
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
    public ResponseEntity<?> getMemberInfo() {
        // TODO: Authentication에서 이메일을 읽어와서 동작하도록 수정
        String userEmail = "test@ssafy.com";

        UserInfoResponse response = myPageService.getUserInfo(userEmail);

        return ResponseEntity.ok(response);
    }
}

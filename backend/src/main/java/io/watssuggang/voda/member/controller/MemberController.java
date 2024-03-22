package io.watssuggang.voda.member.controller;

import io.watssuggang.voda.common.security.annotation.CurrentUser;
import io.watssuggang.voda.common.security.dto.SecurityUserDto;
import io.watssuggang.voda.member.dto.req.SignUpRequest;
import io.watssuggang.voda.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@Slf4j
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@RequestBody SignUpRequest signUpRequest) {
        log.info("회원가입");
        Integer memberId = memberService.signUp(signUpRequest);

        if (memberId == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();

    }

    // 마이페이지 유저 정보 GET
    @GetMapping("/ilgoo")
    public ResponseEntity<SecurityUserDto> ilgoo(@CurrentUser SecurityUserDto securityUserDto) {

        return ResponseEntity.ok(securityUserDto);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> removeUser() {
        // TODO 회원탈퇴 구현
        return ResponseEntity.ok().build();
    }
}

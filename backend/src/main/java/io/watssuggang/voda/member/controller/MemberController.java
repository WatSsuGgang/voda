package io.watssuggang.voda.member.controller;

import io.watssuggang.voda.common.security.dto.*;
import io.watssuggang.voda.member.dto.req.*;
import io.watssuggang.voda.member.service.*;
import lombok.*;
import lombok.extern.slf4j.*;
import org.springframework.http.*;
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
            return new ResponseEntity<>(HttpStatusCode.valueOf(400));
        }
        return ResponseEntity.ok().build();

    }

    // 마이페이지 유저 정보 GET
    @GetMapping("/ilgoo")
    public ResponseEntity<SecurityUserDto> ilgoo(@CurrentUser SecurityUserDto securityUserDto) {

        return new ResponseEntity<>(securityUserDto, HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> removeUser() {
        // TODO 회원탈퇴 구현
        return ResponseEntity.ok().build();
    }
}

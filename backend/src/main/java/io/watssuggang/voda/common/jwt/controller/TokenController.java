package io.watssuggang.voda.common.jwt.controller;

import io.watssuggang.voda.common.jwt.dto.res.*;
import io.watssuggang.voda.common.jwt.service.*;
import io.watssuggang.voda.common.security.dto.*;
import lombok.*;
import lombok.extern.slf4j.*;
import org.springframework.http.*;
import org.springframework.util.*;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/token")
public class TokenController {

    private final RefreshTokenService tokenService;

    @PostMapping("/logout")
    public ResponseEntity<StatusResponseDto> logout(
        @RequestHeader("Authorization") final String accessToken) {
        log.info("Auth컨트롤러 로그아웃 들어옴!!!");
        log.info("들어온 accesstoken: " + accessToken);
        // 엑세스 토큰으로 현재 Redis 정보 삭제
        tokenService.removeRefreshToken(accessToken);
        return ResponseEntity.ok(StatusResponseDto.addStatus(200));
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenResponseStatus> refresh(
        @RequestHeader("Authorization") final String accessToken) {

        log.info("갱신 토큰 컨트롤러");

        log.info(accessToken);

        String newAccessToken = tokenService.republishAccessToken(accessToken);

        if (StringUtils.hasText(newAccessToken)) {
            return ResponseEntity.ok(TokenResponseStatus.addStatus(200, newAccessToken));
        }

        return ResponseEntity.badRequest().body(TokenResponseStatus.addStatus(400, null));

    }

}

package io.watssuggang.voda.common.jwt.controller;

import io.watssuggang.voda.common.jwt.dto.res.TokenResponseStatus;
import io.watssuggang.voda.common.jwt.service.RefreshTokenService;
import io.watssuggang.voda.common.security.dto.StatusResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/token")
public class TokenController {

    private final RefreshTokenService tokenService;

    @DeleteMapping("/logout")
    public ResponseEntity<StatusResponseDto> logout(
        @RequestHeader("Authorization") final String accessToken) {

        // 엑세스 토큰으로 현재 Redis 정보 삭제
        tokenService.removeRefreshToken(accessToken);
        return ResponseEntity.ok(StatusResponseDto.addStatus(200));
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenResponseStatus> refresh(
        @RequestHeader("Authorization") final String accessToken) {

        String newAccessToken = tokenService.republishAccessToken(accessToken);

        if (StringUtils.hasText(newAccessToken)) {
            return ResponseEntity.ok(TokenResponseStatus.addStatus(200, newAccessToken));
        }

        return ResponseEntity.badRequest().body(TokenResponseStatus.addStatus(400, null));

    }

}

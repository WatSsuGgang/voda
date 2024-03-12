package io.watssuggang.voda.member.service;

import io.watssuggang.voda.common.security.dto.RefreshToken;
import io.watssuggang.voda.member.repository.RefreshTokenRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository tokenRepository;

    @Transactional
    public void saveTokenInfo(String email, String refreshToken, String accessToken) {
        System.out.println("refreshTokenService 세이브 메서드");
        tokenRepository.save(new RefreshToken(email, accessToken, refreshToken));
    }

    @Transactional
    public void removeRefreshToken(String accessToken) {
        System.out.println("removeRefreshToken 메서드");

        RefreshToken token = tokenRepository.findByAccessToken(accessToken)
            .orElseThrow(IllegalArgumentException::new);

        System.out.println("삭제하려는 갱신 토큰: " + token);
        tokenRepository.delete(token);
    }

}

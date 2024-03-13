package io.watssuggang.voda.common.jwt.service;

import io.watssuggang.voda.common.jwt.dto.*;
import io.watssuggang.voda.common.jwt.repository.*;
import jakarta.transaction.*;
import lombok.*;
import org.springframework.stereotype.*;

@Service
@RequiredArgsConstructor
public class AccessTokenService {

    private final RefreshTokenRepository tokenRepository;

    @Transactional
    public void saveTokenInfo(String email, String refreshToken, String accessToken) {
        System.out.println("refreshTokenService 세이브 메서드");

        tokenRepository.save(new RefreshToken(email, accessToken, refreshToken));
    }
}

package io.watssuggang.voda.common.jwt.service;

import io.watssuggang.voda.common.jwt.dto.RefreshToken;
import io.watssuggang.voda.common.jwt.repository.RefreshTokenRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccessTokenService {

    private final RefreshTokenRepository tokenRepository;

    @Transactional
    public void saveTokenInfo(String email, String refreshToken, String accessToken) {

        tokenRepository.save(new RefreshToken(email, accessToken, refreshToken));
    }
}

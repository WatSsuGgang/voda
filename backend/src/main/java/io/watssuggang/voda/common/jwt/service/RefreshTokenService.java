package io.watssuggang.voda.common.jwt.service;

import io.watssuggang.voda.common.jwt.dto.RefreshToken;
import io.watssuggang.voda.common.jwt.repository.RefreshTokenRepository;
import jakarta.transaction.Transactional;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository tokenRepository;
    private final TokenProvider tokenProvider;

    @Transactional
    public void removeRefreshToken(String accessToken) {

        RefreshToken token = tokenRepository.findByAccessToken(accessToken)
            .orElseThrow(IllegalArgumentException::new);

        tokenRepository.delete(token);
    }

    @Transactional
    public String republishAccessToken(String accessToken) {
        System.out.println("토큰 재발급");
        // 액세스 토큰으로 Refresh 토큰 객체를 조회
        Optional<RefreshToken> refreshToken = tokenRepository.findByAccessToken(accessToken);

        // RefreshToken이 존재하고 유효하다면 실행
        if (refreshToken.isPresent() && tokenProvider.verifyToken(
            refreshToken.get().getRefreshToken())) {
            // RefreshToken 객체를 꺼내온다.
            RefreshToken resultToken = refreshToken.get();
            // 권한과 아이디를 추출해 새로운 액세스토큰을 만든다.
            String newAccessToken = tokenProvider.generateAccessToken(resultToken.getId(),
                tokenProvider.getRole(resultToken.getRefreshToken()));
            // 액세스 토큰의 값을 수정해준다.
            resultToken.updateAccessToken(newAccessToken);
            tokenRepository.save(resultToken);

            return newAccessToken;
        }

        return null;
    }

}

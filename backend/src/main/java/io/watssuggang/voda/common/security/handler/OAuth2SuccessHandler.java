package io.watssuggang.voda.common.security.handler;

import io.watssuggang.voda.common.jwt.dto.*;
import io.watssuggang.voda.common.jwt.service.*;
import jakarta.servlet.http.*;
import java.io.*;
import java.nio.charset.*;
import lombok.*;
import lombok.extern.slf4j.*;
import org.springframework.security.core.*;
import org.springframework.security.oauth2.core.user.*;
import org.springframework.security.web.authentication.*;
import org.springframework.stereotype.*;
import org.springframework.web.util.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final TokenProvider tokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
        Authentication authentication) throws IOException {
        // OAuth2User로 캐스팅하여 인증된 사용자 정보를 가져온다.
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        // 사용자 이메일을 가져온다.
        String email = oAuth2User.getAttribute("email");
        // 서비스 제공 플랫폼(GOOGLE, KAKAO, NAVER)이 어디인지 가져온다.
        String provider = oAuth2User.getAttribute("provider");

        // CustomOAuth2UserService에서 세팅한 로그인한 회원 존재 여부를 가져온다.
        boolean isExist = Boolean.TRUE.equals(oAuth2User.getAttribute("exist"));

        // OAuth2User로 부터 Role을 얻어온다.
        String role = oAuth2User.getAuthorities().stream().
            findFirst()
            .orElseThrow(IllegalAccessError::new) // 존재하지 않을 시 예외를 던진다.
            .getAuthority();

        // 회원이 존재할경우
        if (isExist) {
            // 회원이 존재하면 jwt token 발행을 시작한다.
            GeneratedToken token = tokenProvider.generateToken(email, role);

            // accessToken을 쿼리스트링에 담는 url을 만들어준다.
            String targetUrl = UriComponentsBuilder.fromUriString(
                    "http://localhost:5173/login-success")
                .queryParam("accessToken", token.getAccessToken())
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUriString();

            // 로그인 확인 페이지로 리다이렉트
            getRedirectStrategy().sendRedirect(request, response, targetUrl);
        } else {
            // 회원이 존재하지 않을경우, 서비스 제공자와 email을 쿼리스트링으로 전달하는 url을 만들어준다.
            String targetUrl = UriComponentsBuilder.fromUriString(
                    "http://localhost:5173/login-success")
                .queryParam("email", (String) oAuth2User.getAttribute("email"))
                .queryParam("provider", provider)
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUriString();

            // 회원가입 페이지로 리다이렉트 시킨다.
            getRedirectStrategy().sendRedirect(request, response, targetUrl);
        }
    }
}

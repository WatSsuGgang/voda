package io.watssuggang.voda.common.security.handler;

import io.watssuggang.voda.common.jwt.TokenProvider;
import io.watssuggang.voda.common.security.dto.GeneratedToken;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

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
        log.info("email: " + email + " provider: " + provider);

        // CustomOAuth2UserService에서 세팅한 로그인한 회원 존재 여부를 가져온다.
        boolean isExist = Boolean.TRUE.equals(oAuth2User.getAttribute("exist"));

        // OAuth2User로 부터 Role을 얻어온다.
        String role = oAuth2User.getAuthorities().stream().
            findFirst() // 첫번째 Role을 찾아온다.
            .orElseThrow(IllegalAccessError::new) // 존재하지 않을 시 예외를 던진다.
            .getAuthority(); // Role을 가져온다.

        // 회원이 존재할경우
        if (isExist) {
            // 회원이 존재하면 jwt token 발행을 시작한다.
            GeneratedToken token = tokenProvider.generateToken(email, role);
            log.info("jwtToken = {}", token.getAccessToken());

            // accessToken을 쿼리스트링에 담는 url을 만들어준다.
//            String targetUrl = UriComponentsBuilder.fromUriString(
//                    "http://localhost:5173/loginSuccess")
            String targetUrl = UriComponentsBuilder.fromUriString(
                    "http://localhost:5173/login-success")
                .queryParam("accessToken", token.getAccessToken())
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUriString();
            log.info("redirect 준비 (로그인 완료) accessToken 전달");
            // 로그인 확인 페이지로 리다이렉트 시킨다.
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

            log.info("redirect 준비 (회원가입) email 전달, 닉네임 설정 화면으로 이동");
            // 회원가입 페이지로 리다이렉트 시킨다.
            getRedirectStrategy().sendRedirect(request, response, targetUrl);
        }
    }
}

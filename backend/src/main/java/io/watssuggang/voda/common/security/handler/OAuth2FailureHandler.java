package io.watssuggang.voda.common.security.handler;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

@Component
public class OAuth2FailureHandler implements AuthenticationFailureHandler {

    @Value("${FRONT_URL}")
    private String redirectURL;

    // 인증 실패시 메인 페이지로 이동
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
        AuthenticationException exception) throws IOException {
        response.sendRedirect(redirectURL + "/login");
    }
}

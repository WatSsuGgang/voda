package io.watssuggang.voda.common.security.handler;

import jakarta.servlet.http.*;
import java.io.*;
import org.springframework.security.core.*;
import org.springframework.security.web.authentication.*;
import org.springframework.stereotype.*;

@Component
public class OAuth2FailureHandler implements AuthenticationFailureHandler {

    // 인증 실패시 메인 페이지로 이동
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
        AuthenticationException exception) throws IOException {
        response.sendRedirect("http://localhost:5173/login");
    }
}

package io.watssuggang.voda.common.security.filter;

import com.fasterxml.jackson.databind.*;
import io.watssuggang.voda.common.jwt.exception.*;
import io.watssuggang.voda.common.security.dto.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.io.*;
import lombok.*;
import org.springframework.http.*;
import org.springframework.stereotype.*;
import org.springframework.web.filter.*;

@Component
@RequiredArgsConstructor
public class JwtExceptionFilter extends OncePerRequestFilter {

    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {

        try {
            filterChain.doFilter(request, response);
        } catch (JwtException e) {
            response.setStatus(401);    // UNAUTHORIZED
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setCharacterEncoding("UTF-8");
            objectMapper.writeValue(response.getWriter(), StatusResponseDto.addStatus(401));
        }
    }
}

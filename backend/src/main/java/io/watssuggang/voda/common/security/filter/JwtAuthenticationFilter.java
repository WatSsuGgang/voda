package io.watssuggang.voda.common.security.filter;

import io.watssuggang.voda.common.jwt.exception.JwtException;
import io.watssuggang.voda.common.jwt.service.TokenProvider;
import io.watssuggang.voda.common.security.dto.SecurityUserDto;
import io.watssuggang.voda.member.domain.Member;
import io.watssuggang.voda.member.service.MemberService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final TokenProvider tokenProvider;
    private final MemberService memberService;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        // RefreshToken 갱신이나 로그아웃 요청일 때 JWTAuthFilter 건너뜀
        return request.getRequestURI().contains("token/");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {

        // request Header에서 AccessToken을 가져온다.
        String atc = request.getHeader("Authorization");

        // 토큰 검사 생략(모두 허용 URL의 경우 토큰 검사 통과)
        if (!StringUtils.hasText(atc)) {
            doFilter(request, response, filterChain);
            return;
        }

        // AccessToken을 검증하고, 만료되었을경우 예외를 발생시킨다.
        if (!tokenProvider.verifyToken(atc)) {
            throw new JwtException();
        }

        // AccessToken의 값이 있고, 유효한 경우에 진행한다.
        if (tokenProvider.verifyToken(atc)) {

            // AccessToken 내부의 payload에 있는 email로 user를 조회한다. 없다면 예외를 발생시킨다 -> 정상 케이스가 아님
            Member findMember = memberService.findByEmail(tokenProvider.getUid(atc));

            // SecurityContext에 등록할 User 객체를 만들어준다.
            SecurityUserDto userDto = SecurityUserDto.builder()
                .memberId(findMember.getMemberId())
                .email(findMember.getMemberEmail())
                .role("ROLE_".concat(findMember.getUserRole()))
                .nickname(findMember.getMemberName())
                .build();

            // SecurityContext에 인증 객체를 등록해준다.
            Authentication auth = getAuthentication(userDto);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        filterChain.doFilter(request, response);
    }

    public Authentication getAuthentication(SecurityUserDto member) {
        return new UsernamePasswordAuthenticationToken(member, "",
            List.of(new SimpleGrantedAuthority(member.getRole())));
    }
}

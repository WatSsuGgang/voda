package io.watssuggang.voda.common.security.config;

import io.watssuggang.voda.common.security.filter.JwtAuthenticationFilter;
import io.watssuggang.voda.common.security.filter.JwtExceptionFilter;
import io.watssuggang.voda.common.security.handler.OAuth2FailureHandler;
import io.watssuggang.voda.common.security.handler.OAuth2SuccessHandler;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer.FrameOptionsConfig;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.*;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final CustomOAuth2UserService oAuth2UserService;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;
    private final OAuth2FailureHandler oAuth2FailureHandler;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtExceptionFilter jwtExceptionFilter;

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() { // security를 적용하지 않을 리소스
        return web -> web.ignoring()
            // error endpoint를 열어줘야 함, favicon.ico 추가!
            .requestMatchers("/error", "/favicon.ico");
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // rest api 설정
        http.csrf(
            AbstractHttpConfigurer::disable); // csrf 비활성화 -> cookie를 사용하지 않으면 꺼도 된다. (cookie를 사용할 경우 httpOnly(XSS 방어), sameSite(CSRF 방어)로 방어해야 한다.)
        http
            .cors(Customizer.withDefaults()) // 커스텀한 corsConfigurationSource 설정을 따름
            .httpBasic(AbstractHttpConfigurer::disable) // 기본 인증 로그인 비활성화
            .formLogin(AbstractHttpConfigurer::disable) // 기본 login form 비활성화
            .logout(AbstractHttpConfigurer::disable) // 기본 logout 비활성화
            .headers(c -> c.frameOptions(
                FrameOptionsConfig::disable).disable()) // X-Frame-Options 비활성화
            .sessionManagement(c ->
                c.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 세션 사용하지 않음

            // request 인증, 인가 설정
            .authorizeHttpRequests(request ->
                    request.requestMatchers(
                            new AntPathRequestMatcher("/auth/signup"),
                            new AntPathRequestMatcher("/token/refresh"),
                            new AntPathRequestMatcher("/token/logout")
                        ).permitAll()
                        .anyRequest().authenticated()   // 그 외의 모든 요청은 인증이 필요하다
//                .anyRequest().permitAll()
            )

            // oauth2 설정
            .oauth2Login(oauth -> // OAuth2 로그인 기능에 대한 여러 설정의 진입점
                // OAuth2 로그인시 사용자의 정보를 가져오는 엔드포인트와 사용자 서비스를 설정
                oauth.userInfoEndpoint(c -> c.userService(oAuth2UserService))
                    .defaultSuccessUrl("/")
                    .successHandler(oAuth2SuccessHandler)   // 실패 핸들러
                    .failureHandler(oAuth2FailureHandler)   // 성공 핸들러
            );

        // UsernamePassword인증필터는 인증되지 않은 사용자의 경우 로그인 페이지로 redirect 시키기 떄문에 jwt 인증 필터 먼저 실행
        return http.addFilterBefore(jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(jwtExceptionFilter, JwtAuthenticationFilter.class)
            .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

//        configuration.setAllowedOrigins(
//            Arrays.asList("https://j10a104.p.ssafy.io:5173", "http://localhost:5173"));
        configuration.setAllowedOriginPatterns(
            Arrays.asList("https://j10a104.p.ssafy.io:5173", "http://localhost:5173",
                "https://j10a104.p.ssafy.io"));
        configuration.setAllowedMethods(
            Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setExposedHeaders(
            Arrays.asList("Content-Type", "X-Requested-With", "Authorization"));
        configuration.setAllowCredentials(true);
        //configuration.setMaxAge(3600L); //1시간

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
package io.watssuggang.voda.common.jwt.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.*;
import io.jsonwebtoken.security.*;
import io.watssuggang.voda.common.jwt.config.*;
import io.watssuggang.voda.common.jwt.dto.*;
import jakarta.annotation.*;
import java.security.*;
import java.util.Base64;
import java.util.*;
import lombok.*;
import org.springframework.stereotype.*;

@Service
@RequiredArgsConstructor
public class TokenProvider {

    private final JwtProperties jwtProperties;
    private final AccessTokenService accessTokenService;
    private Key decodedSecretKey;

    @PostConstruct
    protected void init() {
        String secretKey = Base64.getEncoder().encodeToString(jwtProperties.getSecret().getBytes());
        decodedSecretKey = getKeyFromBase64EncodedKey(secretKey);
    }

    public GeneratedToken generateToken(String email, String role) {
        // refreshToken과 accessToken을 생성한다.
        String refreshToken = generateRefreshToken(email, role);
        String accessToken = generateAccessToken(email, role);

        // 토큰을 Redis에 저장한다.
        accessTokenService.saveTokenInfo(email, refreshToken, accessToken);
        return new GeneratedToken(accessToken, refreshToken);
    }

    public String generateRefreshToken(String email, String role) {
        // 토큰의 유효 기간을 밀리초 단위로 설정.
        long refreshPeriod = 1000L * 60L * 60L * 24L * 30; // 1달

        // 새로운 클레임 객체를 생성하고, 이메일과 역할(권한)을 셋팅
        Claims claims = Jwts.claims().setSubject(email);
        claims.put("role", role);

        // 현재 시간과 날짜를 가져온다.
        Date now = new Date();

        return Jwts.builder()
            // Payload를 구성하는 속성들을 정의한다.
            .setClaims(claims)
            // 발행일자를 넣는다.
            .setIssuedAt(now)
            // 토큰의 만료일시를 설정한다.
            .setExpiration(new Date(now.getTime() + refreshPeriod))
            // 지정된 서명 알고리즘과 비밀 키를 사용하여 토큰을 서명한다.
            .signWith(decodedSecretKey, SignatureAlgorithm.HS256)
            .compact();
    }


    public String generateAccessToken(String email, String role) {
        long tokenPeriod = 1000L * 60L * 60L; // 60분마다 토큰 갱신
        Claims claims = Jwts.claims().setSubject(email);
        claims.put("role", role);

        Date now = new Date();

        return
            Jwts.builder()
                // Payload를 구성하는 속성들을 정의한다.
                .setClaims(claims)
                // 발행일자를 넣는다.
                .setIssuedAt(now)
                // 토큰의 만료일시를 설정한다.
                .setExpiration(new Date(now.getTime() + tokenPeriod))
                // 지정된 서명 알고리즘과 비밀 키를 사용하여 토큰을 서명한다.
                .signWith(decodedSecretKey, SignatureAlgorithm.HS256)
                //.signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

    }

    public boolean verifyToken(String token) {

        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(decodedSecretKey) // 비밀키를 설정하여 파싱한다.
                .build()
                .parseClaimsJws(token);  // 주어진 토큰을 파싱하여 Claims 객체를 얻는다.
            // 토큰의 만료 시간과 현재 시간비교
            return claims.getBody()
                .getExpiration()
                .after(new Date());  // 만료 시간이 현재 시간 이후인지 확인하여 유효성 검사 결과를 반환
        } catch (Exception e) {
            return false;
        }
    }


    // 토큰에서 Email을 추출한다.
    public String getUid(String token) {
        return Jwts.parserBuilder().setSigningKey(decodedSecretKey).build().parseClaimsJws(token)
            .getBody().getSubject();
    }

    // 토큰에서 ROLE(권한)만 추출한다.
    public String getRole(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(decodedSecretKey)
            .build().parseClaimsJws(token).getBody()
            .get("role", String.class);
    }

    // Base64로 인코딩된 문자열에서 HmacSHA 알고리즘을 사용하는 비밀 키를 반환
    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);

        return Keys.hmacShaKeyFor(keyBytes);
    }

}

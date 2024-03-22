package io.watssuggang.voda.common.security.config;

import java.util.*;
import lombok.*;

@Builder(access = AccessLevel.PRIVATE)
@Getter
@ToString
//OAuth 인증을 통해 얻어온 사용자의 정보와 속성들을 Map 형태로 반환 받기 위한 빌더 클래스
public class OAuth2UserInfo {

    private Map<String, Object> attributes; // 사용자 속성 정보를 담는 Map
    private String attributeKey;            // 사용자 속성의 키 값
    private String email;                   // 이메일
    private String provider;                // 제공자 정보

    // 서비스에 따라 OAuth2UserInfo 객체를 생성하는 메서드
    static OAuth2UserInfo of(String registrationId, String userNameAttributeName,
        Map<String, Object> oAuth2UserAttributes) {
        return switch (registrationId) {
            case "google" -> ofGoogle(registrationId, userNameAttributeName, oAuth2UserAttributes);
            case "kakao" -> ofKakao(registrationId, userNameAttributeName, oAuth2UserAttributes);
            case "naver" -> ofNaver(registrationId, userNameAttributeName, oAuth2UserAttributes);
            default -> throw new RuntimeException();
        };
    }

    private static OAuth2UserInfo ofNaver(String registrationId, String userNameAttributeName,
        Map<String, Object> oAuth2UserAttributes) {
        Map<String, Object> naverAccount = (Map<String, Object>) oAuth2UserAttributes.get(
            "response");

        return OAuth2UserInfo.builder()
            .email(naverAccount.get("email").toString())
            .attributes(naverAccount)
            .provider(registrationId)
            .attributeKey(userNameAttributeName)
            .build();
    }

    private static OAuth2UserInfo ofKakao(String registrationId, String userNameAttributeName,
        Map<String, Object> oAuth2UserAttributes) {
        Map<String, Object> kakaoAccount = (Map<String, Object>) oAuth2UserAttributes.get(
            "kakao_account");

        return OAuth2UserInfo.builder()
            .email(kakaoAccount.get("email").toString())
            .provider(registrationId)
            .attributes(kakaoAccount)
            .attributeKey(userNameAttributeName)
            .build();
    }

    private static OAuth2UserInfo ofGoogle(String registrationId, String userNameAttributeName,
        Map<String, Object> oAuth2UserAttributes) {
        return OAuth2UserInfo.builder()
            .email(oAuth2UserAttributes.get("email").toString())
            .provider(registrationId)
            .attributes(oAuth2UserAttributes)
            .attributeKey(userNameAttributeName)
            .build();
    }

    // OAuth2User 객체에 넣어주기 위해 Map으로 변환
    Map<String, Object> convertToMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("id", attributeKey);
        map.put("key", attributeKey);
        map.put("email", email);
        map.put("provider", provider);

        return map;
    }
}

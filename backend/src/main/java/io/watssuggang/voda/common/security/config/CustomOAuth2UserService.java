package io.watssuggang.voda.common.security.config;

import io.watssuggang.voda.member.domain.*;
import io.watssuggang.voda.member.repository.*;
import java.util.*;
import lombok.*;
import lombok.extern.slf4j.*;
import org.springframework.security.core.authority.*;
import org.springframework.security.oauth2.client.userinfo.*;
import org.springframework.security.oauth2.core.*;
import org.springframework.security.oauth2.core.user.*;
import org.springframework.stereotype.*;

@RequiredArgsConstructor
@Service
@Slf4j
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        // 1. 유저 정보(attributes) 가져오기
        Map<String, Object> oAuth2UserAttributes = super.loadUser(userRequest).getAttributes();

        // 2. resistrationId 가져오기 (third-party id), 클라이언트 등록 ID(google, naver, kakao)
        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        // 3. userNameAttributeName 가져오기, 사용자 이름 속성을 가져온다.
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails()
            .getUserInfoEndpoint().getUserNameAttributeName();

        // OAuth2UserService를 사용하여 가져온 OAuth2User 정보로 OAuth2UserInfo 객체를 만든다.
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfo.of(registrationId, userNameAttributeName,
            oAuth2UserAttributes);

        Map<String, Object> memberAttribute = oAuth2UserInfo.convertToMap();

        String email = memberAttribute.get("email").toString();

        // 이메일로 가입된 회원인지 조회한다.
        Optional<Member> findMember = memberRepository.findByMemberEmail(email);

        if (findMember.isEmpty()) {
            log.info("회원이 존재하지 않음");
            // 회원이 존재하지 않을경우, memberAttribute의 exist 값을 false로 넣어준다.
            memberAttribute.put("exist", false);

            // 회원의 권한(회원이 존재하지 않으므로 기본권한인 ROLE_USER를 넣어준다), 회원속성, 속성이름을 이용해 DefaultOAuth2User 객체를 생성해 반환한다.
            return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                memberAttribute, "email");
        }

        log.info("회원이 존재함");
        // 회원이 존재할경우, memberAttribute의 exist 값을 true로 넣어준다.
        memberAttribute.put("exist", true);
        // 회원의 권한과, 회원속성, 속성이름을 이용해 DefaultOAuth2User 객체를 생성해 반환한다.
        return new DefaultOAuth2User(
            Collections.singleton(
                new SimpleGrantedAuthority("ROLE_".concat(findMember.get().getUserRole()))),
            memberAttribute, "email");
    }
}

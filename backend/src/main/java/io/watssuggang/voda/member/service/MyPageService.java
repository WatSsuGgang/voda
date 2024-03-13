package io.watssuggang.voda.member.service;

import io.watssuggang.voda.member.domain.Member;
import io.watssuggang.voda.member.dto.res.UserInfoResponse;
import io.watssuggang.voda.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MyPageService {

    private final MemberRepository memberRepository;

    public UserInfoResponse getUserInfo(String userEmail) {
        Member member = memberRepository.findMemberByMemberEmail(userEmail);
        
        return new UserInfoResponse(member.getMemberName());
    }
}

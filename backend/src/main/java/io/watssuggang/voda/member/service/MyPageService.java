package io.watssuggang.voda.member.service;

import io.watssuggang.voda.member.domain.Member;
import io.watssuggang.voda.member.dto.res.UserInfoResponse;
import io.watssuggang.voda.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MyPageService {

    private final MemberRepository memberRepository;

    public UserInfoResponse getUserInfo(String userEmail) {
        Member member = memberRepository.findMemberByMemberEmail(userEmail);

        return new UserInfoResponse(member.getMemberName());
    }

    public UserInfoResponse updateUserInfo(Integer memberId, String newNickname) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new RuntimeException("회원 정보 없음"));
        member.setMemberName(newNickname);

        return new UserInfoResponse(newNickname);
    }

    public void deleteUser(Integer memberId) {
        memberRepository.deleteById(memberId);
    }
}

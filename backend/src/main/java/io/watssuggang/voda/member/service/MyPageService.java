package io.watssuggang.voda.member.service;

import io.watssuggang.voda.member.domain.Member;
import io.watssuggang.voda.member.dto.res.MemberInfoResponse;
import io.watssuggang.voda.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MyPageService {

    private final MemberRepository memberRepository;

    public MemberInfoResponse updateMemberInfo(Integer memberId, String newNickname) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new RuntimeException("회원 정보 없음"));
        member.setMemberName(newNickname);

        return new MemberInfoResponse(newNickname);
    }

    public void deleteMember(Integer memberId) {
        memberRepository.deleteById(memberId);
    }
}

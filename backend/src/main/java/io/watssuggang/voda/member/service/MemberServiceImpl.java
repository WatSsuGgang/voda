package io.watssuggang.voda.member.service;

import io.watssuggang.voda.member.domain.Member;
import io.watssuggang.voda.member.dto.req.SignUpRequest;
import io.watssuggang.voda.member.exception.MemberNotFoundException;
import io.watssuggang.voda.member.repository.MemberRepository;
import io.watssuggang.voda.pet.domain.Pet;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public Member findByEmail(String uid) {
        Member member = memberRepository.findByMemberEmail(uid)
            .orElseThrow(MemberNotFoundException::new);

        return member;
    }

    @Override
    public Integer signUp(SignUpRequest signUpRequest) {

        Member addMember = Member.builder()
            .memberName(signUpRequest.getNickname())
            .provider(signUpRequest.getProvider())
            .memberEmail(signUpRequest.getEmail())
            .userRole("USER")
            .memberDiaryCount(0)
            .memberPoint(10)
            .build();

        Pet pet = Pet.builder()
            .petName("기본펫")
            .build();

        addMember.addPet(pet);

        Member member = memberRepository.save(addMember);

        return member.getMemberId();
    }
}

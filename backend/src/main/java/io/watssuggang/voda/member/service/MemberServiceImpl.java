package io.watssuggang.voda.member.service;

import io.watssuggang.voda.diary.repository.DiaryRepository;
import io.watssuggang.voda.member.domain.Member;
import io.watssuggang.voda.member.dto.req.SignUpRequest;
import io.watssuggang.voda.member.exception.MemberNotFoundException;
import io.watssuggang.voda.member.repository.MemberRepository;
import io.watssuggang.voda.pet.domain.Pet;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final DiaryRepository diaryRepository;

    @Override
    public Member findByEmail(String uid) {

        return memberRepository.findByMemberEmail(uid)
            .orElseThrow(MemberNotFoundException::new);
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

    /**
     * 매일 자정에 유저들을 순회하면서, 제일 최근에 작성한 일기의 날짜를 확인 그리고 연속 일기 작성 날짜를 업데이트
     */
    @Override
    @Transactional
    public void updateMemberCount() {
        LocalDate now = LocalDate.now();
        List<Member> members = memberRepository.findAll();

        members.forEach(member -> {
            LocalDate lastDiaryDate = diaryRepository.findByMemberAndCreatedAtLast(member)
                .getCreatedAt().toLocalDate();

            if (now.minusDays(1).equals(lastDiaryDate)) {
                member.increaseMemberDiaryCount();
            } else {
                member.setMemberDiaryCount(0);
            }
        });
    }
}

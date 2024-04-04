package io.watssuggang.voda.member.service;

import io.watssuggang.voda.common.enums.ItemCategory;
import io.watssuggang.voda.common.exception.ErrorCode;
import io.watssuggang.voda.diary.repository.DiaryRepository;
import io.watssuggang.voda.member.domain.Member;
import io.watssuggang.voda.member.dto.req.SignUpRequest;
import io.watssuggang.voda.member.exception.MemberException;
import io.watssuggang.voda.member.exception.MemberNotFoundException;
import io.watssuggang.voda.member.repository.MemberRepository;
import io.watssuggang.voda.pet.domain.Own;
import io.watssuggang.voda.pet.domain.Pet;
import io.watssuggang.voda.pet.exception.ItemException;
import io.watssuggang.voda.pet.repository.ItemRepository;
import io.watssuggang.voda.pet.repository.OwnRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final DiaryRepository diaryRepository;
    private final ItemRepository itemRepository;
    private final OwnRepository ownRepository;

    @Override
    public Member findByEmail(String uid) {

        return memberRepository.findByMemberEmail(uid)
            .orElseThrow(MemberNotFoundException::new);
    }

    @Override
    public Integer signUp(SignUpRequest signUpRequest) {
        validExistMember(signUpRequest);

        Member addMember = Member.builder()
            .memberName(signUpRequest.getNickname())
            .provider(signUpRequest.getProvider())
            .memberEmail(signUpRequest.getEmail())
            .userRole("USER")
            .memberDiaryCount(0)
            .memberPoint(10)
            .build();

        Pet pet = Pet.builder()
            .petLastFeed(LocalDateTime.now().minusHours(24))
            .petName("기본펫")
            .build();

        addMember.addPet(pet);
        Member member = memberRepository.save(addMember);

        // 기본 아이템 구매하고 장착
        Arrays.stream(ItemCategory.values()).forEach(itemCategory -> {
            Own item = Own.of();
            item.purchase(addMember, itemRepository.findByItemCategoryAndItemPrice(itemCategory, 0)
                .stream().findFirst()
                .orElseThrow(() -> new ItemException(ErrorCode.ITEM_NOT_FOUND)));
            item.use();
            ownRepository.save(item);
        });

        return member.getMemberId();
    }

    private void validExistMember(SignUpRequest signUpRequest) {
        if (memberRepository.existsByMemberEmailAndProvider(
            signUpRequest.getEmail(),
            signUpRequest.getProvider()
        )) {
            throw new MemberException(ErrorCode.DUPLICATE_MEMBER);
        }
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
            LocalDate date = diaryRepository.findByMemberAndCreatedAtLast(member.getMemberId());
            if (date == null) {
                return;
            }

            log.info(date.toString());
            if (now.minusDays(1).isAfter(date)) {
                member.setMemberDiaryCount(0);
            }
        });
    }
}

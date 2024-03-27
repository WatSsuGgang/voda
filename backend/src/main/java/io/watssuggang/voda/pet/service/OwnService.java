package io.watssuggang.voda.pet.service;

import io.watssuggang.voda.common.enums.ItemStatus;
import io.watssuggang.voda.common.exception.ErrorCode;
import io.watssuggang.voda.common.security.dto.SecurityUserDto;
import io.watssuggang.voda.pet.domain.Own;
import io.watssuggang.voda.pet.dto.res.OwnResponse;
import io.watssuggang.voda.pet.exception.OwnException;
import io.watssuggang.voda.pet.repository.OwnRepository;
import jakarta.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class OwnService {

    private final OwnRepository ownRepository;

    /**
     * 회원 ID로 현재 사용중인 아이템에 대한 정보를 반환하는 메서드
     *
     * @return <p>key- 아이템 카테고리를 소문자로 둔 값</p>
     * value- 아이템 정보
     */
    public Map<String, OwnResponse> getUsingItemByMember(Integer memberId) {
        List<Own> owns = ownRepository.findAllByMember_MemberIdAndItemStatus(
                memberId,
                ItemStatus.USING
        );

        return owns.stream()
                .collect(Collectors.toMap(
                        own -> own.getItem().getItemCategory().name().toLowerCase(),
                        OwnResponse::of
                ));
    }

    /**
     * @apiNote 장착한 같은 카테고리의 아이템이 있으면 해제하고 소유한 현재 아이템을 장착하는 메서드
     */
    public OwnResponse usingItem(SecurityUserDto userDto, Integer ownId) {
        Own verifiedOwn = verifyOwned(ownId);
        validateOwnedItem(userDto.getMemberId(), verifiedOwn.getMember().getMemberId());

        ownRepository.findByMember_MemberIdAndItem_ItemCategoryAndItemStatus(
                userDto.getMemberId(),
                verifiedOwn.getItem().getItemCategory(),
                ItemStatus.USING
        ).ifPresent(Own::owned);

        verifiedOwn.use();
        return OwnResponse.of(verifiedOwn);
    }

    /**
     * 소유 id로 소유한 아이템을 가져오는 메서드
     *
     * @return Own
     */
    private Own verifyOwned(Integer ownId) {
        return ownRepository.findById(ownId)
                .orElseThrow(() -> new OwnException(ErrorCode.OWN_NOT_FOUND));
    }

    /**
     * 아이템 소유자가 같은지 확인하는 메서드
     */
    private void validateOwnedItem(Integer memberId, Integer ownMemberId) {
        if (!Objects.equals(memberId, ownMemberId)) {
            throw new OwnException(ErrorCode.OWN_UNAUTHORIZED);
        }
    }

    /**
     * @param ownIds 해제하고자 하는 아이템의 번호들이 리스트형식으로 들어온다.
     */
    public void unUseItems(SecurityUserDto userDto, List<Integer> ownIds) {
        ownRepository.updateAllByInOwnIds(ownIds, ItemStatus.OWNED, userDto.getMemberId());
    }
}

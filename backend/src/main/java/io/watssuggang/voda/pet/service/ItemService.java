package io.watssuggang.voda.pet.service;

import io.watssuggang.voda.common.exception.ErrorCode;
import io.watssuggang.voda.common.security.dto.SecurityUserDto;
import io.watssuggang.voda.member.domain.Member;
import io.watssuggang.voda.member.service.MemberService;
import io.watssuggang.voda.pet.domain.Item;
import io.watssuggang.voda.pet.domain.Own;
import io.watssuggang.voda.pet.dto.req.*;
import io.watssuggang.voda.pet.dto.res.ItemResponse;
import io.watssuggang.voda.pet.exception.ItemException;
import io.watssuggang.voda.pet.exception.OwnException;
import io.watssuggang.voda.pet.repository.*;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class ItemService {

    private final ItemRepository itemRepository;
    private final ItemQueryRepository itemQueryRepository;
    private final OwnRepository ownRepository;
    private final MemberService memberService;

    public ItemResponse createItem(ItemRequest postRequest) {
        validExistItem(postRequest.getName(), postRequest.getCategory());

        Item createdItem = itemRepository.save(Item.toEntity(postRequest));

        return ItemResponse.of(createdItem);
    }

    public ItemResponse updateItem(Integer itemId, ItemUpdateRequest updateRequest) {
        Item verifyItem = getVerifyItem(itemId);

        verifyItem.update(updateRequest);

        return ItemResponse.of(verifyItem);
    }

    /**
     * 카테고리별로 모든 아이템을 조회하는 메서드
     */
    public List<ItemResponse> getAllItemByCategory(SecurityUserDto userDto, String category) {
        List<? extends Item> findUnBoughtItem = itemQueryRepository.findAllItemByCategory(
                userDto.getMemberId(), category);

        return findUnBoughtItem.stream()
                .map(ItemResponse::of)
                .toList();
    }

    /**
     * 사용자가 아이템을 구매하는 메서드
     *
     * @return 생성된 ItemId
     */
    public Integer buyItem(ItemBuyRequest buyRequest, SecurityUserDto userDto) {
        Item verifyItem = getVerifyItem(buyRequest.getItemId());
        Member member = memberService.findByEmail(userDto.getEmail());
        validBuyItem(userDto.getMemberId(), verifyItem.getItemId());

        Own own = Own.of();
        own.purchase(member, verifyItem);

        return ownRepository.save(own).getOwnedId();
    }

    private void validBuyItem(Integer memberId, Integer itemId) {
        if (ownRepository.existsByMember_MemberIdAndItem_ItemId(memberId, itemId)) {
            throw new OwnException(ErrorCode.ALREADY_COMPLETE_OWN);
        }
    }

    private void validExistItem(String itemName, String category) {
        if (itemQueryRepository.existByItemNameAndItemCategory(itemName, category)) {
            throw new ItemException(ErrorCode.DUPLICATE_ITEM_NAME);
        }
    }

    private Item getVerifyItem(Integer itemId) {
        return itemRepository.findById(itemId)
                .orElseThrow(() -> new ItemException(ErrorCode.ITEM_NOT_FOUND));
    }
}

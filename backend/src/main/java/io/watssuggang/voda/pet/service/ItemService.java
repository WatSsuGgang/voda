package io.watssuggang.voda.pet.service;

import io.watssuggang.voda.common.security.dto.SecurityUserDto;
import io.watssuggang.voda.member.domain.Member;
import io.watssuggang.voda.member.service.MemberService;
import io.watssuggang.voda.pet.domain.Item;
import io.watssuggang.voda.pet.domain.Own;
import io.watssuggang.voda.pet.dto.req.*;
import io.watssuggang.voda.pet.dto.res.ItemResponse;
import io.watssuggang.voda.pet.exception.DuplicateItemNameException;
import io.watssuggang.voda.pet.exception.ItemNotFoundException;
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
        verifyExistItemName(postRequest.getName(), postRequest.getCategory());

        Item createdItem = itemRepository.save(Item.toEntity(postRequest));

        return ItemResponse.of(createdItem);
    }

    public ItemResponse updateItem(Integer itemId, ItemUpdateRequest updateRequest) {
        Item findItem = itemRepository.findById(itemId)
            .orElseThrow(ItemNotFoundException::new);

        findItem.update(updateRequest);

        return ItemResponse.of(findItem);
    }

    private void verifyExistItemName(String itemName, String category) {
        if (itemQueryRepository.existByItemNameAndItemCategory(itemName, category)) {
            throw new DuplicateItemNameException();
        }
    }

    public List<ItemResponse> getAllItemByCategory(String category) {
        List<? extends Item> findAllItem = itemQueryRepository.findAllItemByCategory(category);

        return findAllItem.stream().map(ItemResponse::of)
            .toList();
    }

    public Integer buyItem(ItemBuyRequest buyRequest, SecurityUserDto userDto) {
        Item item = itemRepository.findById(buyRequest.getItemId())
            .orElseThrow(ItemNotFoundException::new);
        Member member = memberService.findByEmail(userDto.getEmail());
        Own own = Own.of();
        own.purchase(member, item);

        return ownRepository.save(own).getOwnedId();
    }
}

package io.watssuggang.voda.pet.service;

import io.watssuggang.voda.pet.domain.Item;
import io.watssuggang.voda.pet.dto.req.ItemRequest;
import io.watssuggang.voda.pet.dto.req.ItemUpdateRequest;
import io.watssuggang.voda.pet.dto.res.ItemResponse;
import io.watssuggang.voda.pet.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;

    public ItemResponse createItem(ItemRequest postRequest) {
        verifyExistItemName(postRequest.getName());

        Item createdItem = itemRepository.save(Item.toEntity(postRequest));

        return ItemResponse.of(createdItem);
    }

    public ItemResponse updateItem(Integer itemId, ItemUpdateRequest updateRequest) {
        Item findItem = itemRepository.findById(itemId)
                .orElseThrow();

        findItem.update(updateRequest);

        return ItemResponse.of(findItem);
    }

    private void verifyExistItemName(String itemName) {
        itemRepository.findByItemName(itemName)
                .orElseThrow(RuntimeException::new);
    }
}

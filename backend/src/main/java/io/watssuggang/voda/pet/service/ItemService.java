package io.watssuggang.voda.pet.service;

import io.watssuggang.voda.pet.domain.Item;
import io.watssuggang.voda.pet.dto.req.ItemPostRequest;
import io.watssuggang.voda.pet.dto.res.ItemResponse;
import io.watssuggang.voda.pet.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;

    public ItemResponse createItem(ItemPostRequest postRequest) {
        Item createdItem = itemRepository.save(Item.toEntity(postRequest));

        return ItemResponse.of(createdItem);
    }
}

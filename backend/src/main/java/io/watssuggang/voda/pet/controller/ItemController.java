package io.watssuggang.voda.pet.controller;

import io.watssuggang.voda.common.enums.ItemCategory;
import io.watssuggang.voda.common.security.annotation.CurrentUser;
import io.watssuggang.voda.common.security.dto.SecurityUserDto;
import io.watssuggang.voda.common.validator.EnumValidator;
import io.watssuggang.voda.pet.dto.req.*;
import io.watssuggang.voda.pet.dto.res.ItemResponse;
import io.watssuggang.voda.pet.service.ItemService;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/item")
public class ItemController {

    private final ItemService itemService;

    @PostMapping
    public ResponseEntity<ItemResponse> createItem(
            @RequestBody @Valid ItemRequest postRequest
    ) {
        ItemResponse item = itemService.createItem(postRequest);
        return ResponseEntity.ok(item);
    }

    @PostMapping("/buy")
    public ResponseEntity<URI> buyItem(
            @CurrentUser SecurityUserDto userDto,
            @RequestBody @Valid ItemBuyRequest buyRequest
    ) {
        Integer ownId = itemService.buyItem(buyRequest, userDto);
        return ResponseEntity.created(URI.create(String.format("/item/buy/%d", ownId))).build();
    }

    @PatchMapping("{item-id}")
    public ResponseEntity<?> updateItem(
            @RequestBody @Valid ItemUpdateRequest updateRequest,
            @PathVariable("item-id") Integer itemId
    ) {
        ItemResponse itemResponse = itemService.updateItem(itemId, updateRequest);
        return ResponseEntity.ok(itemResponse);
    }

    @GetMapping
    public ResponseEntity<?> getItemsByCategory(
            @Valid @RequestParam(value = "category")
            @EnumValidator(enumClass = ItemCategory.class, message = "유효하지 않은 카테고리입니다.")
            String category
    ) {
        List<ItemResponse> itemsByCategory = itemService.getAllItemByCategory(category);
        return ResponseEntity.ok(itemsByCategory);
    }
}

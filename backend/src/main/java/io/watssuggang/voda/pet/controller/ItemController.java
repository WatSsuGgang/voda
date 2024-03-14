package io.watssuggang.voda.pet.controller;

import io.watssuggang.voda.pet.dto.req.ItemRequest;
import io.watssuggang.voda.pet.dto.res.ItemResponse;
import io.watssuggang.voda.pet.service.ItemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/item")
public class ItemController {

    private final ItemService itemService;

    @PostMapping
    public ResponseEntity<ItemResponse> createItem(
            @RequestBody @Valid ItemRequest postRequest
    ) {
        ItemResponse item = itemService.createItem(postRequest);
        return ResponseEntity.ok(item);
    }
}

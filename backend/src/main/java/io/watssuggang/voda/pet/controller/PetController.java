package io.watssuggang.voda.pet.controller;

import io.watssuggang.voda.common.security.dto.SecurityUserDto;
import io.watssuggang.voda.pet.dto.req.PetTalkRequest;
import io.watssuggang.voda.pet.dto.req.PetUpdateRequest;
import io.watssuggang.voda.pet.dto.res.*;
import io.watssuggang.voda.pet.service.PetService;
import jakarta.validation.Valid;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/pet")
@Validated
public class PetController {

    private final PetService petService;

    @GetMapping
    public ResponseEntity<PetHomeResponse> getPetHomeInfo(
            @AuthenticationPrincipal SecurityUserDto userDto
    ) {
        PetHomeResponse response = petService.getPetHomeInfo(userDto.getMemberId());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/talk/{pet-id}")
    public ResponseEntity<PetTalkResponse> getPetTalk(
            @AuthenticationPrincipal SecurityUserDto userDto,
            @PathVariable("pet-id") Integer petId
    ) {
        PetTalkResponse talk = petService.getTalk(userDto, petId);
        return ResponseEntity.ok(talk);
    }

    @PostMapping("/talk")
    public ResponseEntity<?> createTalk(@RequestBody @Valid PetTalkRequest request) {
        Integer createdId = petService.createTalk(request);
        URI location = URI.create(String.format("api/v1/pet/%d", createdId));
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/feed/{pet-id}")
    public ResponseEntity<?> feed(@PathVariable("pet-id") Integer petId) {
        PetResponse feed = petService.feed(petId);
        return ResponseEntity.ok(feed);
    }

    @PatchMapping("/levelup/{pet-id}")
    public ResponseEntity<?> levelUp(@PathVariable("pet-id") Integer petId) {
        PetResponse petResponse = petService.levelUp(petId);
        return ResponseEntity.ok(petResponse);
    }

    @PatchMapping("{pet-id}")
    public ResponseEntity<?> updateInfo(
            @PathVariable("pet-id") Integer petId,
            @RequestBody PetUpdateRequest updateRequest
    ) {
        PetResponse petResponse = petService.update(petId, updateRequest);
        return ResponseEntity.ok(petResponse);
    }
}

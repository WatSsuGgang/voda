package io.watssuggang.voda.pet.controller;

import io.watssuggang.voda.common.security.annotation.CurrentUser;
import io.watssuggang.voda.common.security.dto.SecurityUserDto;
import io.watssuggang.voda.pet.dto.req.PetTalkRequest;
import io.watssuggang.voda.pet.dto.req.PetUpdateRequest;
import io.watssuggang.voda.pet.dto.res.*;
import io.watssuggang.voda.pet.service.PetService;
import jakarta.validation.Valid;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
            @CurrentUser SecurityUserDto userDto
    ) {
        PetHomeResponse response = petService.getPetHomeInfo(userDto.getMemberId());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/talk")
    public ResponseEntity<PetTalkResponse> getPetTalk(
            @CurrentUser SecurityUserDto userDto
    ) {
        PetTalkResponse talk = petService.getTalk(userDto);
        return ResponseEntity.ok(talk);
    }

    @PostMapping("/talk")
    public ResponseEntity<URI> createTalk(@RequestBody @Valid PetTalkRequest request) {
        Integer createdId = petService.createTalk(request);
        URI location = URI.create(String.format("api/v1/pet/%d", createdId));
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/feed")
    public ResponseEntity<PetResponse> feed(
            @CurrentUser SecurityUserDto userDto
    ) {
        PetResponse feed = petService.feed(userDto);
        return ResponseEntity.ok(feed);
    }

    @PatchMapping("/levelup")
    public ResponseEntity<PetResponse> levelUp(
            @CurrentUser SecurityUserDto userDto
    ) {
        PetResponse petResponse = petService.levelUp(userDto);
        return ResponseEntity.ok(petResponse);
    }

    @PatchMapping
    public ResponseEntity<PetResponse> updateInfo(
            @CurrentUser SecurityUserDto userDto,
            @RequestBody @Valid PetUpdateRequest updateRequest
    ) {
        PetResponse petResponse = petService.update(userDto, updateRequest);
        return ResponseEntity.ok(petResponse);
    }
}

package io.watssuggang.voda.pet.controller;

import io.watssuggang.voda.pet.dto.res.PetHomeResponse;
import io.watssuggang.voda.pet.service.PetService;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/pet")
public class PetController {

    private final PetService petService;

    @GetMapping("/{member-id}")
    public ResponseEntity<?> getPetHomeInfo(@PathVariable("member-id") Integer memberId) {
        PetHomeResponse response = petService.getPetHomeInfo(memberId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/talk")
    public ResponseEntity<?> getPetTalk() {
        petService.getTalk();
        return ResponseEntity.ok().build();
    }

    @PostMapping("/talk")
    public ResponseEntity<?> createTalk() {
        petService.createTalk();
        return ResponseEntity.created(URI.create("1L")).build();
    }

    @PatchMapping("/feed")
    public ResponseEntity<?> feed() {
        petService.feed();
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/levelup")
    public ResponseEntity<?> levelUp() {
        petService.levelUp();
        return ResponseEntity.ok().build();
    }

    @PatchMapping
    public ResponseEntity<?> updateInfo() {
        petService.update();
        return ResponseEntity.ok().build();
    }
}

package io.watssuggang.voda.pet.service;

import io.watssuggang.voda.pet.domain.Pet;
import io.watssuggang.voda.pet.domain.PetFile;
import io.watssuggang.voda.pet.dto.res.PetHomeResponse;
import io.watssuggang.voda.pet.dto.res.PetResponse;
import io.watssuggang.voda.pet.repository.PetFileRepository;
import io.watssuggang.voda.pet.repository.PetRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class PetService {

    private final PetRepository petRepository;
    private final PetFileRepository petFileRepository;
    private final OwnService ownService;

    public void feed() {
    }

    public void levelUp() {
    }

    public void update() {
    }

    public void getTalk() {
    }

    public void createTalk() {
    }

    public PetHomeResponse getPetHomeInfo(Integer memberId) {
        Pet pet = getPetInfo(memberId);
        PetFile petFile = petFileRepository.findByPetEmotionAndPetStage(pet.getPetEmotion(),
                        pet.getPetStage())
                .orElseThrow(RuntimeException::new);

        return new PetHomeResponse(
                PetResponse.of(pet, petFile),
                ownService.getAllOwnByMember(memberId)
        );
    }

    private Pet getPetInfo(Integer memberId) {
        return petRepository.findByMember_MemberId(memberId)
                .orElseThrow(RuntimeException::new);
    }
}

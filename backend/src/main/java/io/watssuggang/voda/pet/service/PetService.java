package io.watssuggang.voda.pet.service;

import io.watssuggang.voda.common.enums.PetStatus;
import io.watssuggang.voda.common.util.DateUtil;
import io.watssuggang.voda.pet.domain.*;
import io.watssuggang.voda.pet.dto.req.PetTalkRequest;
import io.watssuggang.voda.pet.dto.res.*;
import io.watssuggang.voda.pet.repository.*;
import jakarta.transaction.Transactional;
import java.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class PetService {

    private final PetRepository petRepository;
    private final PetFileRepository petFileRepository;
    private final PetTalkRepository petTalkRepository;
    private final DiaryRepository diaryRepository;
    private final OwnService ownService;

    public void feed() {
    }

    public void levelUp() {
    }

    public void update() {
    }

    public PetTalkResponse getTalk(Integer petId) {
        Pet pet = petRepository.findById(petId)
                .orElseThrow(RuntimeException::new);

        int count = diaryRepository.countDiaryByPetIdAndAfterToday(petId, DateUtil.getTodayDate());

        List<PetStatus> petStatuses = new ArrayList<>(List.of(PetStatus.JOKE));
        if (DateUtil.AfterMidNight(pet.getPetLastFeed())) {
            petStatuses.add(PetStatus.HUNGRY);
        }

        if (count > 0) {
            petStatuses.add(PetStatus.DIARY);
        }

        Random random = new Random();
        int rand = random.nextInt(count);

        PetStatus petStatus = petStatuses.get(rand);
        List<PetTalk> status = petTalkRepository.findAllByPetStatus(petStatus);

        rand = random.nextInt(status.size());
        return PetTalkResponse.of(status.get(rand));
    }

    public Integer createTalk(PetTalkRequest request) throws Exception {
        PetTalk petTalk = new PetTalk(request.getTalk(), request.getStatus());
        verifyPetTalk(petTalk);
        return petTalkRepository.save(petTalk).getPetTalkId();
    }

    private void verifyPetTalk(PetTalk petTalk) {
        if (petTalkRepository.existsPetTalkByPetTalkAndPetStatus(petTalk.getPetTalk(),
                petTalk.getPetStatus())) {
            throw new RuntimeException();
        }
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

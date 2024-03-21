package io.watssuggang.voda.pet.service;

import io.watssuggang.voda.common.enums.*;
import io.watssuggang.voda.common.util.DateUtil;
import io.watssuggang.voda.diary.domain.Diary;
import io.watssuggang.voda.diary.repository.DiaryRepository;
import io.watssuggang.voda.pet.domain.Pet;
import io.watssuggang.voda.pet.domain.PetTalk;
import io.watssuggang.voda.pet.dto.req.PetTalkRequest;
import io.watssuggang.voda.pet.dto.req.PetUpdateRequest;
import io.watssuggang.voda.pet.dto.res.*;
import io.watssuggang.voda.pet.repository.PetRepository;
import io.watssuggang.voda.pet.repository.PetTalkRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.*;
import java.util.Map.Entry;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class PetService {

    private final PetRepository petRepository;
    private final PetTalkRepository petTalkRepository;
    private final DiaryRepository diaryRepository;
    private final OwnService ownService;

    public PetResponse feed(Integer petId) {
        Pet pet = getVerifyPetByPetId(petId);

        if (DateUtil.AfterTodayMidNight(pet.getPetLastFeed())) {
            throw new RuntimeException();
        }

        pet.updateExp((byte) 5);
        return PetResponse.of(pet);
    }

    public PetResponse levelUp(Integer petId) {
        Pet pet = getVerifyPetByPetId(petId);

        // 펫 레벨업 empty: 변화없음, 2, 3: 단계
        Byte beforePetStage = pet.getPetStage();
        Optional<Byte> levelUpStage = pet.levelUp();
        return levelUpStage.map(s -> {
            byte status = levelUpStage.get();

            if (beforePetStage != status) {
                if (status == 3) {
                    PetAppearance evolution = evolution(petId);
                    pet.updateAppearance(evolution);
                } else if (status == 2) {
                    pet.updateAppearance(PetAppearance.CHICK);
                }
            }
            return PetResponse.of(pet);
        }).orElseThrow(RuntimeException::new);
    }

    public PetAppearance evolution(Integer petId) {
        List<Diary> diaries = diaryRepository.findAllByPetId(petId);

        // 감정별 일기 최신 값
        Map<Emotion, Optional<Diary>> latestDiariesByEmotion = diaries.stream()
            .collect(Collectors.groupingBy(Diary::getDiaryEmotion,
                Collectors.maxBy(Comparator.comparing(Diary::getModifiedAt))));

        // 감정별 일기 수
        Map<Emotion, Long> emotionCount = diaries.stream()
            .collect(Collectors.groupingBy(Diary::getDiaryEmotion, Collectors.counting()));

        // 최대 감정 수 및 최신 감정 찾기
        Optional<Entry<Emotion, Long>> findDiary = emotionCount.entrySet().stream()
            .max(Comparator.comparing((Entry<Emotion, Long> entry) -> {
                Emotion emotion = entry.getKey();
                Long count = entry.getValue();
                Optional<Diary> recentDiary = latestDiariesByEmotion.get(emotion);
                // 감정 개수와 최신 일기의 modifiedAt 값을 합쳐서 비교
                // 최신 일기가 없는 경우에는 감정 개수만으로 비교
                return recentDiary.map(diary -> count +
                        diary.getModifiedAt()
                            .toInstant(ZoneOffset.UTC)
                            .toEpochMilli())
                    .orElse(count);
            }));

        // 일기를 안쓰고 진화 조건 충족
        if (findDiary.isEmpty()) {
            return PetAppearance.OTTER;
        }

        return findDiary.map(entry -> {
            Emotion emotion = entry.getKey();
            long highestEmotionCount = entry.getValue();
            // 감정에 따라 다른 동물
            return PetAppearance.findAppearanceByEmotionAndCount(
                emotion,
                highestEmotionCount == diaries.size(),
                LocalDateTime.now().getHour() % 2 == 0
            );
        }).orElseThrow(RuntimeException::new);
    }

    public PetResponse update(Integer petId, PetUpdateRequest updateRequest) {
        Pet pet = getVerifyPetByPetId(petId);

        Optional.of(updateRequest.getName())
            .ifPresent(pet::updateName);

        return PetResponse.of(pet);
    }

    public PetTalkResponse getTalk(Integer petId) {
        Pet pet = petRepository.findById(petId)
            .orElseThrow(RuntimeException::new);

        int count = diaryRepository.countDiaryByPetIdAndAfterToday(petId, DateUtil.getTodayDate());

        List<PetStatus> petStatuses = new ArrayList<>(List.of(PetStatus.JOKE));
        if (DateUtil.AfterTodayMidNight(pet.getPetLastFeed())) {
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

    public Integer createTalk(PetTalkRequest request) {
        PetTalk petTalk = PetTalk.builder()
            .petTalk(request.getTalk())
            .petStatus(request.getStatus())
            .build();
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
        Pet pet = getVerifyPetByMemberId(memberId);

        return PetHomeResponse.of(
            PetResponse.of(pet),
            ownService.getAllOwnByMember(memberId)
        );
    }

    public Pet getVerifyPetByMemberId(Integer memberId) {
        return petRepository.findByMember_MemberId(memberId)
            .orElseThrow(RuntimeException::new);
    }

    public Pet getVerifyPetByPetId(Integer petId) {
        return petRepository.findByMember_MemberId(petId)
            .orElseThrow(RuntimeException::new);
    }
}
package io.watssuggang.voda.pet.service;

import io.watssuggang.voda.common.enums.*;
import io.watssuggang.voda.common.exception.ErrorCode;
import io.watssuggang.voda.common.security.dto.SecurityUserDto;
import io.watssuggang.voda.common.util.DateUtil;
import io.watssuggang.voda.diary.domain.Diary;
import io.watssuggang.voda.diary.exception.DiaryException;
import io.watssuggang.voda.diary.repository.DiaryRepository;
import io.watssuggang.voda.member.domain.PointLog;
import io.watssuggang.voda.member.service.PointLogService;
import io.watssuggang.voda.pet.domain.Pet;
import io.watssuggang.voda.pet.domain.PetTalk;
import io.watssuggang.voda.pet.dto.req.PetTalkRequest;
import io.watssuggang.voda.pet.dto.req.PetUpdateRequest;
import io.watssuggang.voda.pet.dto.res.*;
import io.watssuggang.voda.pet.exception.PetException;
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
    private final PointLogService pointLogService;

    /**
     * 펫에게 먹이를 준다. 5의 경험치가 올라간다.
     */
    public PetResponse feed(SecurityUserDto userDto) {
        Pet pet = getVerifyPetByMemberId(userDto.getMemberId());
        validatePet(userDto.getMemberId(), pet.getMember().getMemberId());

        if (DateUtil.AfterTodayMidNight(pet.getPetLastFeed())) {
            throw new PetException(ErrorCode.ALREADY_COMPLETED_FEED);
        }

        pet.updateExp((byte) 5);
        pet.feed();

        pet.getMember().increasePoint(10);

        pointLogService.makePointLog(
                PointLog.ofEarnPointLog(pet.getMember(), 10, "밥")
        );

        return PetResponse.of(pet);
    }

    /**
     * 펫을 레벨업한다. 레벨업한 펫이 단계가 올라가는 경우, 다른 형태로 변화한다.
     */
    public PetResponse levelUp(SecurityUserDto userDto) {
        Pet pet = getVerifyPetByMemberId(userDto.getMemberId());
        validatePet(userDto.getMemberId(), pet.getMember().getMemberId());

        Byte beforePetStage = pet.getPetStage();
        Optional<Byte> levelUpStage = pet.levelUp();
        return levelUpStage.map(s -> {
            byte status = levelUpStage.get();

            if (beforePetStage != status) {
                if (status == 3) {
                    PetAppearance evolution = evolution(userDto.getMemberId());
                    pet.updateAppearance(evolution);
                } else if (status == 2) {
                    pet.updateAppearance(PetAppearance.CHICK);
                }
            }
            return PetResponse.of(pet);
        }).orElseThrow(() -> new PetException(ErrorCode.PET_CANT_LEVEL_UP));
    }

    /**
     * @apiNote 펫을 진화시키는 함수.
     * <p>
     * 전체 일기에서 가장 많은, 가장 최신의 감정 하나를 가져온다. 해당 감정에 따라 진화의 조건이 바뀐다.
     * </p>
     */
    public PetAppearance evolution(Integer memberId) {
        List<Diary> diaries = diaryRepository.findAllByMember_MemberId(memberId);

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
                    return Comparator.comparingLong((Diary diary) ->
                                    recentDiary.map(d -> d.getModifiedAt()
                                                    .toInstant(ZoneOffset.UTC)
                                                    .toEpochMilli())
                                            .orElse(Long.MIN_VALUE)) // 최신 일기가 없는 경우 최소값으로 설정
                            .thenComparingLong(diary -> count)
                            .compare(recentDiary.orElse(null), null); // null이면 count로 비교
                }));

        // 일기를 안쓰고 진화 조건 충족
        if (findDiary.isEmpty()) {
            return PetAppearance.OTTER;
        }

        return findDiary.map(entry -> {
            Emotion emotion = entry.getKey();
            long highestEmotionCount = entry.getValue();
            return PetAppearance.findAppearanceByEmotionAndCount(
                    emotion,
                    highestEmotionCount == diaries.size(),
                    LocalDateTime.now().getHour() % 2 == 0
            );
        }).orElseThrow(() -> new DiaryException(ErrorCode.DIARY_NOT_FOUND));
    }

    /**
     * 펫의 이름을 바꾸는 메서드
     */
    public PetResponse update(
            SecurityUserDto userDto,
            PetUpdateRequest updateRequest
    ) {
        Pet pet = getVerifyPetByMemberId(userDto.getMemberId());

        Optional.of(updateRequest.getName())
                .ifPresent(pet::updateName);

        return PetResponse.of(pet);
    }

    /**
     * PetId로 현재 펫의 상태를 가져온다. 오늘 남은 일기 횟수, 먹이 섭취 여부, 농담으로 랜덤한 대사를 반환한다.
     */
    public PetTalkResponse getTalk(SecurityUserDto userDto) {
        Pet verifyPet = getVerifyPetByMemberId(userDto.getMemberId());

        int count = diaryRepository.countDiaryByPetIdAndAfterToday(verifyPet.getPetId(),
                DateUtil.getTodayDate());

        List<PetStatus> petStatuses = new ArrayList<>(List.of(PetStatus.JOKE));
        if (!DateUtil.AfterTodayMidNight(verifyPet.getPetLastFeed())) {
            petStatuses.add(PetStatus.HUNGRY);
        }

        if (count == 0) {
            petStatuses.add(PetStatus.DIARY);
        }

        Random random = new Random();
        int rand = random.nextInt(petStatuses.size());

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

    /**
     * 펫화면에서 보이는 사용중인 아이템 정보를 가져오는 메서드
     *
     * @return 펫 정보, 사용중인 아이템에 대해 반환
     */
    public PetHomeResponse getPetHomeInfo(Integer memberId) {
        Pet verifyPet = getVerifyPetByMemberId(memberId);
        Map<String, OwnResponse> usingItem = ownService.getUsingItemByMember(memberId);

        return PetHomeResponse.of(
                PetResponse.of(verifyPet),
                usingItem
        );
    }

    private void verifyPetTalk(PetTalk petTalk) {
        if (petTalkRepository.existsPetTalkByPetTalkAndPetStatus(
                petTalk.getPetTalk(),
                petTalk.getPetStatus()
        )) {
            throw new PetException(ErrorCode.PET_TALK_NOT_FOUND);
        }
    }

    private Pet getVerifyPetByMemberId(Integer memberId) {
        return petRepository.findByMember_MemberId(memberId)
                .orElseThrow(() -> new PetException(ErrorCode.PET_NOT_FOUND));
    }

    private Pet getVerifyPetByPetId(Integer petId) {
        return petRepository.findById(petId)
                .orElseThrow(() -> new PetException(ErrorCode.PET_NOT_FOUND));
    }

    private void validatePet(Integer memberId, Integer petMemberId) {
        if (!Objects.equals(memberId, petMemberId)) {
            throw new PetException(ErrorCode.PET_NOT_FOUND);
        }
    }
}
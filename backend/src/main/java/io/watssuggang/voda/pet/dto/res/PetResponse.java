package io.watssuggang.voda.pet.dto.res;

import static io.watssuggang.voda.common.constant.Constant.MAX_EXP;

import io.watssuggang.voda.common.enums.Emotion;
import io.watssuggang.voda.common.util.DateUtil;
import io.watssuggang.voda.pet.domain.Pet;
import lombok.Getter;

@Getter
public class PetResponse {

    private final Integer petId;
    private final Boolean isEvolution;
    private final String name;
    private final String petAppearance;
    private final Byte stage;
    private final Byte level;
    private final Byte exp;
    private final Boolean isFeed;
    private final Emotion emotion;

    private PetResponse(Pet pet) {
        this.petId = pet.getPetId();
        this.isEvolution = pet.getPetExp() >= MAX_EXP;
        this.name = pet.getPetName();
        this.petAppearance = pet.getPetAppearance().getName();
        this.exp = pet.getPetExp();
        this.level = pet.getPetLevel();
        this.emotion = pet.getPetEmotion();
        this.stage = pet.getPetStage();
        this.isFeed = DateUtil.AfterTodayMidNight(pet.getPetLastFeed());
    }

    public static PetResponse of(Pet pet) {
        return new PetResponse(pet);
    }
}

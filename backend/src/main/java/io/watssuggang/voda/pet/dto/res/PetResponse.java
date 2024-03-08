package io.watssuggang.voda.pet.dto.res;

import io.watssuggang.voda.common.enums.Emotion;
import io.watssuggang.voda.common.util.DateUtil;
import io.watssuggang.voda.pet.domain.Pet;
import io.watssuggang.voda.pet.domain.PetFile;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class PetResponse {

    private final String name;
    private final PetFileResponse petImgUrl;
    private final Byte exp;
    private final Byte level;
    private final Emotion emotion;
    private final Byte stage;
    private final Boolean isFeed;

    public PetResponse(Pet pet, PetFile petFile) {
        this.name = pet.getPetName();
        this.petImgUrl = PetFileResponse.of(petFile);
        this.exp = pet.getPetExp();
        this.level = pet.getPetLevel();
        this.emotion = pet.getPetEmotion();
        this.stage = pet.getPetStage();
        this.isFeed = DateUtil.AfterMidNight(pet.getPetLastFeed());
    }

    public static PetResponse of(Pet pet, PetFile petFile) {
        return new PetResponse(pet, petFile);
    }
}

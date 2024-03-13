package io.watssuggang.voda.pet.dto.res;

import io.watssuggang.voda.common.enums.PetStatus;
import io.watssuggang.voda.pet.domain.PetTalk;
import lombok.Getter;

@Getter
public class PetTalkResponse {

    private final String petTalk;
    private final PetStatus petStatus;

    private PetTalkResponse(PetTalk petTalk) {
        this.petTalk = petTalk.getPetTalk();
        this.petStatus = petTalk.getPetStatus();
    }

    public static PetTalkResponse of(PetTalk petTalk) {
        return new PetTalkResponse(petTalk);
    }
}

package io.watssuggang.voda.pet.dto.res;

import io.watssuggang.voda.common.enums.PetStatus;
import io.watssuggang.voda.pet.domain.PetTalk;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PetTalkResponse {

    private String petTalk;
    private PetStatus petStatus;

    public PetTalkResponse(PetTalk petTalk) {
        this.petTalk = petTalk.getPetTalk();
        this.petStatus = petTalk.getPetStatus();
    }

    public static PetTalkResponse of(PetTalk petTalk) {
        return new PetTalkResponse(petTalk);
    }
}

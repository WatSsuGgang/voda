package io.watssuggang.voda.pet.dto.res;

import java.util.List;
import lombok.Getter;

@Getter
public class PetHomeResponse {

    private final PetResponse pet;
    private final List<OwnResponse> owned;

    private PetHomeResponse(PetResponse pet, List<OwnResponse> owned) {
        this.pet = pet;
        this.owned = owned;
    }

    public static PetHomeResponse of(PetResponse pet, List<OwnResponse> owned) {
        return new PetHomeResponse(pet, owned);
    }
}

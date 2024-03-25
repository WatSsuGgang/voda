package io.watssuggang.voda.pet.dto.res;

import java.util.List;
import lombok.Getter;

@Getter
public class PetHomeResponse {

    private final PetResponse pet;
    private final List<OwnResponse> using;

    private PetHomeResponse(PetResponse pet, List<OwnResponse> using) {
        this.pet = pet;
        this.using = using;
    }

    public static PetHomeResponse of(
            PetResponse pet,
            List<OwnResponse> using
    ) {
        return new PetHomeResponse(pet, using);
    }
}

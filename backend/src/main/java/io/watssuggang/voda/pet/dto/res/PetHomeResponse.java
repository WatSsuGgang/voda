package io.watssuggang.voda.pet.dto.res;

import java.util.List;
import java.util.Map;
import lombok.Getter;

@Getter
public class PetHomeResponse {

    private final PetResponse pet;
    private final Map<String, OwnResponse> map;

    public PetHomeResponse(PetResponse pet, Map<String, OwnResponse> using) {
        this.pet = pet;
        this.map = using;
    }

    public static PetHomeResponse of(
            PetResponse pet,
            Map<String, OwnResponse> using
    ) {
        return new PetHomeResponse(pet, using);
    }
}

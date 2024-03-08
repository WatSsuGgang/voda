package io.watssuggang.voda.pet.dto.res;

import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class PetHomeResponse {

    private final PetResponse pet;
    private final List<ItemResponse> owned;
}

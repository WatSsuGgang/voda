package io.watssuggang.voda.pet.dto.res;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class ItemResponse {

    private final Integer itemId;
    private final String imgURl;
    private final String name;
}

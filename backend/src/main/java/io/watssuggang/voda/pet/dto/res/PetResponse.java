package io.watssuggang.voda.pet.dto.res;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class PetResponse {

    private final String name;
    private final PetFileResponse petImgUrl;
    private final Byte exp;
    private final Byte level;
    private final Boolean isFeed;
}

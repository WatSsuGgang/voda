package io.watssuggang.voda.pet.dto.res;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class PetFileResponse {

    private final Integer fileId;
    private final String fileType;
    private final String fileUrl;
}

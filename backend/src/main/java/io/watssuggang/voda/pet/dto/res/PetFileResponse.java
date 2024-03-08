package io.watssuggang.voda.pet.dto.res;

import io.watssuggang.voda.common.enums.FileType;
import io.watssuggang.voda.pet.domain.PetFile;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class PetFileResponse {

    private final Integer fileId;
    private final FileType fileType;
    private final String fileUrl;

    public PetFileResponse(PetFile petFile) {
        this.fileId = petFile.getFileId();
        this.fileType = petFile.getFileType();
        this.fileUrl = petFile.getFileUrl();
    }

    public static PetFileResponse of(PetFile petFile) {
        return new PetFileResponse(petFile);
    }
}

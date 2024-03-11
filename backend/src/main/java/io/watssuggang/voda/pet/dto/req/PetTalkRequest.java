package io.watssuggang.voda.pet.dto.req;

import io.watssuggang.voda.common.enums.PetStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@NoArgsConstructor
public class PetTalkRequest {

    @NotBlank(message = "펫 대사를 입력하세요")
    private String talk;
    @NotNull(message = "펫 대사 상태 코드를 선택하세요")
    private PetStatus status;

    public PetTalkRequest(String talk, PetStatus status) {
        this.talk = talk;
        this.status = status;
    }
}

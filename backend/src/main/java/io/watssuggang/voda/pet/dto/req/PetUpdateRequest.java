package io.watssuggang.voda.pet.dto.req;

import jakarta.validation.constraints.*;
import lombok.Getter;

@Getter
public class PetUpdateRequest {

    @NotBlank(message = "펫 이름을 입력하세요.")
    @Size(min = 1, max = 12, message = "아이템 이름은 1글자 이상 12글자 이하로 설정해주세요.")
    @Pattern(regexp = "^(?![0-9])[a-zA-Z\\uAC00-\\uD7A3][a-zA-Z\\uAC00-\\uD7A3\\d]*$",
            message = "펫 이름은 한글, 영어, 숫자만 포함하며, 숫자는 맨 처음에 사용할 수 없습니다. ")
    private String name;

}

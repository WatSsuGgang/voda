package io.watssuggang.voda.member.dto.req;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UpdateMemberInfoRequest {

    @NotBlank(message = "닉네임을 입력하세요.")
    @Size(min = 1, max = 20, message = "닉네임은 1글자 이상 20글자 이하로 설정해주세요.")
    @Pattern(regexp = "^(?!\\s)[a-zA-Z0-9가-힣\\s]+$", message = "닉네임은 한글, 영어만 허용됩니다.")
    private String newNickname;

}

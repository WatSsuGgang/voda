package io.watssuggang.voda.pet.dto.req;

import io.watssuggang.voda.common.enums.ItemCategory;
import io.watssuggang.voda.common.validator.EnumValidator;
import jakarta.validation.constraints.*;
import lombok.Getter;
import org.hibernate.validator.constraints.Range;

@Getter
public class ItemRequest {

    @NotBlank(message = "이미지 주소를 입력하세요.")
    private String imgUrl;

    @NotBlank(message = "아이템 이름을 입력하세요.")
    @Size(min = 1, max = 30, message = "아이템 이름은 1글자 이상 30글자 이하로 설정해주세요.")
    @Pattern(regexp = "^(?!\\s)[a-zA-Z0-9가-힣\\s]+$", message = "아이템 이름은 알파벳, 숫자, 공백만 허용됩니다.")
    private String name;

    @NotNull(message = "가격을 입력하세요.")
    @Range(min = 0, max = 999, message = "가격은 0원 이상 999원 이하여야 합니다.")
    private Integer price;

    @NotNull(message = "카테고리가 필요합니다.")
    @EnumValidator(enumClass = ItemCategory.class, message = "유효하지 않은 카테고리입니다.")
    private String category;
}

package io.watssuggang.voda.pet.dto.req;

import jakarta.validation.constraints.Positive;
import lombok.Getter;

@Getter
public class ItemBuyRequest {

    @Positive(message = "아이템 번호는 자연수 입니다.")
    private Integer itemId;
}

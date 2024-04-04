package io.watssuggang.voda.pet.dto.req;

import lombok.Getter;
import org.hibernate.validator.constraints.Range;

@Getter
public class ItemUpdateRequest {

    private String imgUrl;

    @Range(min = 0, max = 999, message = "가격은 0원 이상 999원 이하여야 합니다.")
    private Integer price;
}

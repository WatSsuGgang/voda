package io.watssuggang.voda.pet.dto.res;

import io.watssuggang.voda.pet.domain.Item;
import lombok.Getter;

@Getter
public class OwnResponse {

    private final Integer itemId;
    private final String imgURl;
    private final String name;

    private OwnResponse(Item item) {
        this.itemId = item.getItemId();
        this.imgURl = item.getItemImageUrl();
        this.name = item.getItemName();
    }

    public static OwnResponse of(Item item) {
        return new OwnResponse(item);
    }
}

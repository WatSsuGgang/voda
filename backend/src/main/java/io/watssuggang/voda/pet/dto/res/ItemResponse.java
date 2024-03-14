package io.watssuggang.voda.pet.dto.res;

import io.watssuggang.voda.pet.domain.Item;
import lombok.Getter;

@Getter
public class ItemResponse {

    private final Integer itemId;
    private final String imgURl;
    private final Integer price;
    private final String name;

    private ItemResponse(Item item) {
        this.itemId = item.getItemId();
        this.imgURl = item.getItemImageUrl();
        this.price = item.getItemPrice();
        this.name = item.getItemName();
    }

    public static ItemResponse of(Item item){
        return new ItemResponse(item);
    }
}

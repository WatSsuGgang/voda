package io.watssuggang.voda.pet.dto.res;

import io.watssuggang.voda.common.enums.ItemStatus;
import io.watssuggang.voda.pet.domain.Own;
import lombok.Getter;

@Getter
public class OwnResponse {

    private final Integer ownId;
    private final ItemStatus itemStatus;
    private final ItemResponse item;

    private OwnResponse(Own own) {
        this.ownId = own.getOwnedId();
        this.itemStatus = own.getItemStatus();
        this.item = ItemResponse.of(own.getItem());
    }

    public static OwnResponse of(Own own) {
        return new OwnResponse(own);
    }
}

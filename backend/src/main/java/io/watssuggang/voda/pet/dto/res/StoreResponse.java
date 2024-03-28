package io.watssuggang.voda.pet.dto.res;

import io.watssuggang.voda.pet.domain.Own;
import java.util.List;
import lombok.Getter;

@Getter
public class StoreResponse {

    private final List<OwnResponse> bought;
    private final List<ItemResponse> display;

    public StoreResponse(List<OwnResponse> bought, List<ItemResponse> display) {
        this.bought = bought;
        this.display = display;
    }

    public static StoreResponse of(List<OwnResponse> bought, List<ItemResponse> display) {
        return new StoreResponse(bought, display);
    }
}

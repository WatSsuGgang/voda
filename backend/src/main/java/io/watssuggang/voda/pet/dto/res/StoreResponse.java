package io.watssuggang.voda.pet.dto.res;

import java.util.List;
import lombok.Getter;

@Getter
public class StoreResponse {

    private final List<ItemResponse> bought;
    private final List<ItemResponse> display;

    public StoreResponse(List<ItemResponse> bought, List<ItemResponse> display) {
        this.bought = bought;
        this.display = display;
    }

    public static StoreResponse of(List<ItemResponse> bought, List<ItemResponse> display) {
        return new StoreResponse(bought, display);
    }
}

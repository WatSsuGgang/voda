package io.watssuggang.voda.pet.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

@Entity
@DiscriminatorValue("F")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Food extends Item {

    @Builder
    public Food(String itemImageUrl, Integer itemPrice, String itemName) {
        super(itemImageUrl, itemPrice, itemName);
    }
}

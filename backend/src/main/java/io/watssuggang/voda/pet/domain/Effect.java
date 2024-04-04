package io.watssuggang.voda.pet.domain;


import io.watssuggang.voda.common.enums.ItemCategory;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

@Entity
@DiscriminatorValue("02")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Effect extends Item {

    @Builder
    public Effect(String itemImageUrl, Integer itemPrice, String itemName,
        ItemCategory itemCategory) {
        super(itemImageUrl, itemPrice, itemName, itemCategory);
    }
}

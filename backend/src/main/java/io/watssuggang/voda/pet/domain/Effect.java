package io.watssuggang.voda.pet.domain;


import jakarta.persistence.*;
import lombok.*;

@Entity
@DiscriminatorValue("E")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Effect extends Item {

    @Builder
    public Effect(String itemImageUrl, Integer itemPrice, String itemName) {
        super(itemImageUrl, itemPrice, itemName);
    }
}

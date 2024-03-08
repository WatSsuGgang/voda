package io.watssuggang.voda.pet.domain;

import io.watssuggang.voda.common.domain.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(discriminatorType = DiscriminatorType.CHAR, name = "item_type")
@DiscriminatorValue("i")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Item extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer itemId;

    private String itemImageUrl;

    private Integer itemPrice;

    @Column(columnDefinition = "char(30)")
    private String itemName;

    @Builder
    public Item(String itemImageUrl, Integer itemPrice, String itemName) {
        this.itemImageUrl = itemImageUrl;
        this.itemPrice = itemPrice;
        this.itemName = itemName;
    }
}

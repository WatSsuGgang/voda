package io.watssuggang.voda.pet.domain;

import io.watssuggang.voda.common.domain.BaseEntity;
import io.watssuggang.voda.common.enums.ItemCategory;
import io.watssuggang.voda.pet.dto.req.ItemRequest;
import io.watssuggang.voda.pet.dto.req.ItemUpdateRequest;
import jakarta.persistence.*;
import java.util.Optional;
import lombok.*;

@Entity
@Getter
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(discriminatorType = DiscriminatorType.STRING, name = "item_category")
@DiscriminatorValue("item")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"item_name", "item_type"})})
public class Item extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer itemId;

    private String itemImageUrl;

    private Integer itemPrice;

    @Column(columnDefinition = "char(30)")
    private String itemName;

    @Column(name = "item_category", insertable = false, updatable = false)
    private ItemCategory itemCategory;

    public Item(String itemImageUrl, Integer itemPrice, String itemName,
            ItemCategory itemCategory) {
        this.itemImageUrl = itemImageUrl;
        this.itemPrice = itemPrice;
        this.itemName = itemName;
        this.itemCategory = itemCategory;
    }

    public static Item toEntity(ItemRequest postRequest) {
        switch (ItemCategory.valueOf(postRequest.getCategory().toUpperCase())) {
            case EFFECT -> {
                return Effect.builder()
                        .itemName(postRequest.getName())
                        .itemPrice(postRequest.getPrice())
                        .itemImageUrl(postRequest.getImgUrl())
                        .itemCategory(ItemCategory.EFFECT)
                        .build();
            }
            case FOOD -> {
                return Food.builder()
                        .itemName(postRequest.getName())
                        .itemPrice(postRequest.getPrice())
                        .itemImageUrl(postRequest.getImgUrl())
                        .itemCategory(ItemCategory.FOOD)
                        .build();
            }
        }
        throw new RuntimeException();
    }

    public void update(ItemUpdateRequest updateRequest) {
        Optional.ofNullable(updateRequest.getPrice())
                .ifPresent(price -> this.itemPrice = price);
        Optional.ofNullable(updateRequest.getImgUrl())
                .ifPresent(imgUrl -> this.itemImageUrl = imgUrl);
    }
}

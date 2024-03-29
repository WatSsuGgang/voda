package io.watssuggang.voda.pet.repository;

import io.watssuggang.voda.common.enums.ItemCategory;
import io.watssuggang.voda.pet.domain.Item;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Integer> {

    Optional<Item> findByItemCategoryAndItemPrice(ItemCategory itemCategory, Integer price);
}

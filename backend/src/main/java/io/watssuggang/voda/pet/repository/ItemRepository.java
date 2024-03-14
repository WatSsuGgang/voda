package io.watssuggang.voda.pet.repository;

import io.watssuggang.voda.pet.domain.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Integer> {

}

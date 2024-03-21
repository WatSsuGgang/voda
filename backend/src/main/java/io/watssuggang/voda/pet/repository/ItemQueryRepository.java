package io.watssuggang.voda.pet.repository;

import static io.watssuggang.voda.pet.domain.QItem.item;

import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.jpa.impl.JPAQueryFactory;
import io.watssuggang.voda.common.enums.ItemCategory;
import io.watssuggang.voda.pet.domain.*;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class ItemQueryRepository {

    private final JPAQueryFactory queryFactory;

    public List<? extends Item> findAllItemByCategory(String category) {
        return queryFactory
                .selectFrom(getCategory(category))
                .fetch();
    }

    public boolean existByItemNameAndItemCategory(String itemName, String category) {
        return queryFactory
                .selectOne()
                .from(getCategory(category))
                .where(item.itemName.eq(itemName))
                .fetchFirst() != null;
    }

    public EntityPathBase<? extends Item> getCategory(String category) {
        switch (ItemCategory.valueOf(category.toUpperCase())) {
            case EFFECT -> {
                return item.as(QEffect.class);
            }
            case FOOD -> {
                return item.as(QFood.class);
            }
        }
        return null;
    }
}

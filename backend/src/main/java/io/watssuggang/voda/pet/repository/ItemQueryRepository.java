package io.watssuggang.voda.pet.repository;

import static io.watssuggang.voda.pet.domain.QItem.item;
import static io.watssuggang.voda.pet.domain.QOwn.own;

import com.querydsl.core.types.dsl.BooleanExpression;
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

    public List<? extends Item> findAllItemNotInOwn(Integer memberId, String category) {
        return queryFactory
                .selectFrom(getCategory(category))
                .where(item.itemId.notIn(
                        queryFactory.select(own.item.itemId)
                                .from(own)
                                .where(eqOwnMemberId(memberId))
                )).fetch();
    }

    public List<? extends Item> findAllItemInOwn(Integer memberId, String category) {
        return queryFactory
                .selectFrom(getCategory(category))
                .where(item.itemId.in(
                        queryFactory.select(own.item.itemId)
                                .from(own)
                                .where(eqOwnMemberId(memberId))
                )).fetch();
    }

    private static BooleanExpression eqOwnMemberId(Integer memberId) {
        return own.member.memberId.eq(memberId);
    }

    public boolean existByItemNameAndItemCategory(String itemName, String category) {
        return queryFactory
                .selectOne()
                .from(getCategory(category))
                .where(item.itemName.eq(itemName))
                .fetchFirst() != null;
    }

    private EntityPathBase<? extends Item> getCategory(String category) {
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

package io.watssuggang.voda.pet.repository;

import io.watssuggang.voda.common.enums.ItemCategory;
import io.watssuggang.voda.common.enums.ItemStatus;
import io.watssuggang.voda.pet.domain.Own;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.*;

public interface OwnRepository extends JpaRepository<Own, Integer> {

    List<Own> findAllByMember_MemberIdAndItemStatus(Integer memberId, ItemStatus itemStatus);
    List<Own> findAllByMember_MemberId(Integer memberId);
    Optional<Own> findByMember_MemberIdAndItem_ItemCategoryAndItemStatus(Integer memberId, ItemCategory itemCategory, ItemStatus itemStatus);

    boolean existsByMember_MemberIdAndItem_ItemId(Integer memberId, Integer itemId);

    @Modifying
    @Query(value = "UPDATE Own o "
            + "SET o.itemStatus =:itemStatus "
            + "WHERE o.ownedId in :ids "
            + "AND o.member.memberId = :memberId")
    void updateAllByInOwnIds(List<Integer> ids, ItemStatus itemStatus, Integer memberId);

}

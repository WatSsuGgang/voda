package io.watssuggang.voda.pet.repository;

import io.watssuggang.voda.common.enums.ItemStatus;
import io.watssuggang.voda.pet.domain.Own;
import java.util.List;
import org.springframework.data.jpa.repository.*;

public interface OwnRepository extends JpaRepository<Own, Integer> {

    List<Own> findAllByMember_MemberIdAndItemStatus(Integer memberId, ItemStatus itemStatus);

    @Modifying
    @Query(value = "UPDATE Own o "
            + "SET o.itemStatus =:itemStatus "
            + "WHERE o.ownedId in :ids "
            + "AND o.member.memberId = :memberId")
    void updateAllByInOwnIds(List<Integer> ids, ItemStatus itemStatus, Integer memberId);

}

package io.watssuggang.voda.pet.repository;

import io.watssuggang.voda.pet.domain.Own;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OwnRepository extends JpaRepository<Own, Integer> {

    List<Own> findAllByMember_MemberId(Integer memberId);
}

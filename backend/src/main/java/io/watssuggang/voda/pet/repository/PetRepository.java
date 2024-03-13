package io.watssuggang.voda.pet.repository;

import io.watssuggang.voda.pet.domain.Pet;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetRepository extends JpaRepository<Pet, Integer> {

    Optional<Pet> findByMember_MemberId(Integer memberId);

}

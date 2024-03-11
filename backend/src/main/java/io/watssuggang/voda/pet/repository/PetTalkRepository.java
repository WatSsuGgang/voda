package io.watssuggang.voda.pet.repository;

import io.watssuggang.voda.common.enums.PetStatus;
import io.watssuggang.voda.pet.domain.PetTalk;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetTalkRepository extends JpaRepository<PetTalk, Integer> {

    boolean existsPetTalkByPetTalkAndPetStatus(String petTalk, PetStatus petStatus);
}

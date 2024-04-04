package io.watssuggang.voda.pet.repository;

import io.watssuggang.voda.common.enums.PetStatus;
import io.watssuggang.voda.pet.domain.PetTalk;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetTalkRepository extends JpaRepository<PetTalk, Integer> {

    Boolean existsPetTalkByPetTalkAndPetStatus(String petTalk, PetStatus petStatus);

    List<PetTalk> findAllByPetStatus(PetStatus petStatus);
}

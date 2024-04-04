package io.watssuggang.voda.pet.repository;

import io.watssuggang.voda.common.domain.File;
import io.watssuggang.voda.common.enums.Emotion;
import io.watssuggang.voda.pet.domain.PetFile;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PetFileRepository extends JpaRepository<File, Integer> {

    @Query("SELECT pf FROM PetFile pf "
        + "where pf.petEmotion=:emotion "
        + "and pf.petStage=:stage ")
    Optional<PetFile> findByPetEmotionAndPetStage(Emotion emotion, Byte stage);
}

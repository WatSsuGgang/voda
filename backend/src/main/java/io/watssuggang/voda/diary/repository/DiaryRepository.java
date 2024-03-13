package io.watssuggang.voda.diary.repository;

import io.watssuggang.voda.diary.domain.Diary;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DiaryRepository extends JpaRepository<Diary, Integer> {

  @Query("SELECT COUNT(d) FROM Diary d WHERE d.member.pet.petId = :petId AND d.createdAt >= :createdAt")
  Integer countDiaryByPetIdAndAfterToday(Integer petId, LocalDateTime createdAt);

    @Query("SELECT d FROM Diary d WHERE d.member.pet.petId=:petId")
    List<Diary> findAllByPetId(Integer petId);
}

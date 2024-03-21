package io.watssuggang.voda.diary.repository;

import io.watssuggang.voda.diary.domain.*;
import java.time.*;
import java.util.*;
import org.springframework.data.jpa.repository.*;

public interface DiaryRepository extends JpaRepository<Diary, Integer>, DiaryCustomRepository {

    @Query("SELECT COUNT(d) FROM Diary d WHERE d.member.pet.petId = :petId AND d.createdAt >= :createdAt")
    Integer countDiaryByPetIdAndAfterToday(Integer petId, LocalDateTime createdAt);

    @Query("SELECT d FROM Diary d WHERE d.member.pet.petId=:petId")
    List<Diary> findAllByPetId(Integer petId);

    @Query("SELECT d FROM Diary d WHERE d.member.memberId = :memberId AND MONTH(d.createdAt) = MONTH (CURRENT_DATE())")
    List<Diary> findAllByMemberAndCreatedAtAfterCurrentMonth(Integer memberId);
}

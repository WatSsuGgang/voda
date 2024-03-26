package io.watssuggang.voda.diary.repository;

import io.watssuggang.voda.diary.domain.Diary;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DiaryRepository extends JpaRepository<Diary, Integer>, DiaryCustomRepository {

    @Query("SELECT COUNT(d) FROM Diary d WHERE d.member.pet.petId = :petId AND d.createdAt >= :createdAt")
    Integer countDiaryByPetIdAndAfterToday(Integer petId, LocalDateTime createdAt);

    @Query("SELECT d FROM Diary d WHERE d.member.pet.petId=:petId")
    List<Diary> findAllByPetId(Integer petId);

    @Query("SELECT d FROM Diary d WHERE d.member.memberId = :memberId AND MONTH(d.createdAt) = MONTH (CURRENT_DATE()) AND YEAR(d.createdAt) = YEAR(CURRENT_DATE())")
    List<Diary> findAllByMemberAndCreatedAtAfterCurrentMonth(Integer memberId);

    @Query("SELECT d FROM Diary d WHERE d.member.memberId = :memberId AND MONTH(d.createdAt) = :month AND YEAR(d.createdAt) = :year")
    List<Diary> findAllByMemberAndCreatedAtGivenMonthAndYear(Integer memberId, Integer month,
        Integer year);

    @Query("SELECT d FROM Diary d WHERE d.member.memberId = :memberId AND DAY(d.createdAt) = :day AND MONTH(d.createdAt) = :month AND YEAR(d.createdAt) = :year")
    List<Diary> findAllByMemberAndCreatedAtGivenDate(Integer memberId, Integer day, Integer month,
        Integer year);

    @Query("SELECT d FROM Diary d WHERE d.member.memberId = :memberId AND DATE(d.createdAt) < CURRENT_DATE() ORDER BY d.createdAt DESC LIMIT 1")
    Diary findByMemberAndCreatedAtLast(Integer memberId);
}

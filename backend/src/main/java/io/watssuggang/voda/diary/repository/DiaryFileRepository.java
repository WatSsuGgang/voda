package io.watssuggang.voda.diary.repository;

import io.watssuggang.voda.diary.domain.Diary;
import io.watssuggang.voda.diary.domain.DiaryFile;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DiaryFileRepository extends JpaRepository<DiaryFile, Integer> {
    @Query("SELECT df FROM DiaryFile df WHERE df.diary.diaryId = :diaryId")
    List<DiaryFile> findFilesByDiaryId(Integer diaryId);
}

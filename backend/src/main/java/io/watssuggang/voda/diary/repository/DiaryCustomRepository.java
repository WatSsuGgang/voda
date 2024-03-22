package io.watssuggang.voda.diary.repository;

import io.watssuggang.voda.diary.domain.Diary;
import java.time.LocalDateTime;
import java.util.List;

public interface DiaryCustomRepository {

    List<Diary> findDiariesByCondition(LocalDateTime start, LocalDateTime end, String emotion,
        int memberId);

}

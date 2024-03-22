package io.watssuggang.voda.diary.repository;

import io.watssuggang.voda.common.enums.Emotion;
import io.watssuggang.voda.diary.domain.Diary;
import java.time.LocalDateTime;
import java.util.List;

public interface DiaryCustomRepository {

    List<Diary> findDiariesByCondition(LocalDateTime start, LocalDateTime end, Emotion emotion,
        int memberId);

}

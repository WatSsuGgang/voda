package io.watssuggang.voda.diary.repository;

import io.watssuggang.voda.common.enums.*;
import io.watssuggang.voda.diary.domain.*;
import java.time.*;
import java.util.*;

public interface DiaryCustomRepository {

    List<Diary> findDiariesByCondition(LocalDateTime start, LocalDateTime end, Emotion emotion,
        int memberId);

}

package io.watssuggang.voda.diary.repository;

import com.querydsl.jpa.impl.*;
import io.watssuggang.voda.common.enums.*;
import io.watssuggang.voda.diary.domain.*;
import java.time.*;
import java.util.*;
import lombok.*;

@RequiredArgsConstructor
public class DiaryCustomRepositoryImpl implements DiaryCustomRepository {

    private final JPAQueryFactory queryFactory;


    @Override
    public List<Diary> findDiariesByCondition(LocalDateTime start, LocalDateTime end,
        Emotion emotion, int memberId) {
        QDiary diary = QDiary.diary;

        return queryFactory
            .selectFrom(diary)
            .where(diary.modifiedAt.between(start, end)
                .and(diary.diaryEmotion.eq(emotion))
                .and(diary.member.memberId.eq(memberId)))
            .orderBy(diary.modifiedAt.desc())
            .fetch();
    }
}

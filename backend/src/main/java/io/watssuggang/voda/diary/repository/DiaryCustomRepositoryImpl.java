package io.watssuggang.voda.diary.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import io.watssuggang.voda.common.enums.Emotion;
import io.watssuggang.voda.diary.domain.Diary;
import io.watssuggang.voda.diary.domain.QDiary;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;

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

package io.watssuggang.voda.diary.dto.res;

import io.watssuggang.voda.common.enums.*;
import io.watssuggang.voda.diary.domain.*;
import java.time.*;
import java.util.*;
import lombok.*;

@Getter
public class DiaryDetailResponse {

    private final Integer diaryId;
    private final String writerName;
    private final LocalDateTime createdAt;
    private final String diaryTitle;
    private final String diaryContent;
    private final Emotion diaryEmotion;
    private final List<DiaryFile> diaryFiles;

    private DiaryDetailResponse(Diary diary) {
        this.diaryId = diary.getDiaryId();
        this.writerName = diary.getMember().getMemberName();
        this.createdAt = diary.getModifiedAt();
        this.diaryTitle = diary.getDiarySummary();
        this.diaryContent = diary.getDiaryContent();
        this.diaryEmotion = diary.getDiaryEmotion();
        this.diaryFiles = diary.getDiaryFiles();
    }

    public static DiaryDetailResponse of(Diary diary) {
        return new DiaryDetailResponse(diary);
    }

}

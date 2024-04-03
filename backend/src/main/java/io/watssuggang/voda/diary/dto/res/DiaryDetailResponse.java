package io.watssuggang.voda.diary.dto.res;

import io.watssuggang.voda.common.enums.Emotion;
import io.watssuggang.voda.diary.domain.Diary;
import io.watssuggang.voda.diary.domain.DiaryFile;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;

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
        this.createdAt = diary.getCreatedAt();
        this.diaryTitle = diary.getDiarySummary();
        this.diaryContent = diary.getDiaryContent();
        this.diaryEmotion = diary.getDiaryEmotion();
        this.diaryFiles = diary.getDiaryFiles();
    }

    public static DiaryDetailResponse of(Diary diary) {
        return new DiaryDetailResponse(diary);
    }

}

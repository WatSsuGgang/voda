package io.watssuggang.voda.diary.dto.res;

import io.watssuggang.voda.common.enums.Emotion;
import io.watssuggang.voda.common.enums.FileType;
import io.watssuggang.voda.diary.domain.Diary;
import io.watssuggang.voda.diary.domain.DiaryFile;
import java.util.ArrayList;
import java.util.List;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

@Getter
@Slf4j
public class DailyDiaryResDto {

    List<DailyDiaryInfo> diaries;

    public DailyDiaryResDto(List<Diary> diaries) {
        this.diaries = new ArrayList<>();

        for (Diary diary : diaries) {
            this.diaries.add(DailyDiaryInfo.builder()
                .diaryId(diary.getDiaryId())
                .emotion(diary.getDiaryEmotion())
                .title(diary.getDiarySummary())
                .image(diary.getDiaryFiles().stream()
                    .peek(diaryFile -> log.info("file id: " + diaryFile.getFileId()))
                    .filter(diaryFile -> diaryFile.getFileType().equals(FileType.WEBP))
                    .map(DiaryFile::getFileUrl)
                    .findFirst()
                    .orElse(""))
                .build());
        }
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class DailyDiaryInfo {

        Integer diaryId;
        String image;
        Emotion emotion;
        String title;
    }
}

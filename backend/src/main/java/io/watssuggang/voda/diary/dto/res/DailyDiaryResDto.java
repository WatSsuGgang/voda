package io.watssuggang.voda.diary.dto.res;

import io.watssuggang.voda.common.enums.Emotion;
import io.watssuggang.voda.common.enums.FileType;
import io.watssuggang.voda.diary.domain.Diary;
import io.watssuggang.voda.diary.domain.DiaryFile;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public class DailyDiaryResDto {

    List<DailyDiaryInfo> diaries;

    public DailyDiaryResDto(List<Diary> diaries) {
        this.diaries = new ArrayList<>();

        for (Diary diary : diaries) {
            this.diaries.add(new DailyDiaryInfo(
                diary.getDiaryFiles().stream()
                    .filter(diaryFile -> diaryFile.getFileType().equals(FileType.IMG))
                    .map(DiaryFile::getFileUrl)
                    .findFirst()
                    .orElse(""),
                diary.getDiaryEmotion()));
        }
    }

    @Getter
    @AllArgsConstructor
    public static class DailyDiaryInfo {

        String image;
        Emotion emotion;
    }
}

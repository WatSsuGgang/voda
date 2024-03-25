package io.watssuggang.voda.diary.dto.res;

import io.watssuggang.voda.common.enums.Emotion;
import io.watssuggang.voda.common.enums.FileType;
import io.watssuggang.voda.diary.domain.Diary;
import io.watssuggang.voda.diary.domain.DiaryFile;
import java.util.ArrayList;
import java.util.List;
import lombok.*;

@Getter
public class DailyDiaryResDto {

    List<DailyDiaryInfo> diaries;

    public DailyDiaryResDto(List<Diary> diaries) {
        this.diaries = new ArrayList<>();

        for (Diary diary : diaries) {
            List<DiaryFile> imgList = diary.getDiaryFiles().stream()
                .filter(diaryFile -> diaryFile.getFileType().equals(FileType.IMG)).toList();

            this.diaries.add(new DailyDiaryInfo(
                imgList.isEmpty() ? "" : imgList.get(0).getFileUrl(),
                diary.getDiaryEmotion()));
        }
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class DailyDiaryInfo {

        String image;
        Emotion emotion;
    }
}

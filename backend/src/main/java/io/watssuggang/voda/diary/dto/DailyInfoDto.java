package io.watssuggang.voda.diary.dto;

import io.watssuggang.voda.common.enums.Emotion;
import io.watssuggang.voda.diary.domain.Diary;
import java.util.ArrayList;
import java.util.List;
import lombok.*;

@Getter
@Setter
public class DailyInfoDto {

    private Integer day;
    private Emotion dailyEmotion;
    List<DiaryEmotion> diaries;

    @AllArgsConstructor
    @Getter
    public static class DiaryEmotion {

        Emotion diaryEmotion;
    }

    public DailyInfoDto(int day, List<Diary> diaryList) {
        this.diaries = new ArrayList<>();
        int[] emotionsMem = new int[Emotion.values().length];
        this.day = day;

        for (Diary d : diaryList) {
            diaries.add(new DiaryEmotion(d.getDiaryEmotion()));
            ++emotionsMem[d.getDiaryEmotion().ordinal()];
        }

        int maxIdx = -1;
        int maxVal = 0;

        for (int i = 0; i < emotionsMem.length; ++i) {
            if (maxIdx < 0 || emotionsMem[i] > maxVal) {
                maxIdx = i;
                maxVal = emotionsMem[i];
            }
        }

        this.dailyEmotion = Emotion.values()[maxIdx];
    }
}

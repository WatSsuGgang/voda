package io.watssuggang.voda.diary.dto;

import io.watssuggang.voda.common.enums.Emotion;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DailyInfoDto {

    private Integer day;
    private Emotion dailyEmotion;
    List<DiaryEmotion> diaries;

    public static class DiaryEmotion {

        Emotion diaryEmotion;
    }
}

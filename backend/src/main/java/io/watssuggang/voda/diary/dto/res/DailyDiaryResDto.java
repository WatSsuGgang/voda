package io.watssuggang.voda.diary.dto.res;

import io.watssuggang.voda.common.enums.Emotion;
import java.util.List;
import lombok.*;

@Getter
public class DailyDiaryResDto {

    List<DailyDiaryInfo> diaries;

    @Getter
    @Builder
    @AllArgsConstructor
    public static class DailyDiaryInfo {

        String image;
        Emotion emotion;
    }
}

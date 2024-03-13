package io.watssuggang.voda.member.dto.res;

import io.watssuggang.voda.member.dto.EmotionStaticsDto;
import io.watssuggang.voda.member.dto.WeeklyStaticsDto;
import lombok.*;

@Builder
@RequiredArgsConstructor
@Getter
public class EmotionReportResponse {

    private final Integer diaryCount;
    private final EmotionStaticsDto emotionStatics;
    private final WeeklyStaticsDto weeklyStatics;
    private final String petName;
}

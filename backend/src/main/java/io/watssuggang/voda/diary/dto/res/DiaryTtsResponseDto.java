package io.watssuggang.voda.diary.dto.res;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
public class DiaryTtsResponseDto {

    private String ttsUrl;
    private Integer diaryId;
    private Boolean terminate;
}

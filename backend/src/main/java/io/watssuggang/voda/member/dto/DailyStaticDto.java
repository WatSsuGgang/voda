package io.watssuggang.voda.member.dto;

import io.watssuggang.voda.common.enums.Emotion;
import lombok.*;

@Getter
@AllArgsConstructor
@Builder
public class DailyStaticDto {

    private Emotion emotion;
    private String summary;
}
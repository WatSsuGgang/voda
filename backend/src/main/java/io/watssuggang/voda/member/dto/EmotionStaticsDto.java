package io.watssuggang.voda.member.dto;

import lombok.*;

@Getter
@RequiredArgsConstructor
@Builder
public class EmotionStaticsDto {

    private final Double joy;
    private final Double anger;
    private final Double sadness;
    private final Double fear;
    private final Double curiosity;

}

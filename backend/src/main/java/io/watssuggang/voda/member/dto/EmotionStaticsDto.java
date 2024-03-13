package io.watssuggang.voda.member.dto;

import lombok.*;

@Getter
@AllArgsConstructor
@Builder
public class EmotionStaticsDto {

    private Double joy;
    private Double anger;
    private Double sadness;
    private Double fear;
    private Double curiosity;

}

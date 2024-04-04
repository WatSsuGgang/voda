package io.watssuggang.voda.diary.dto.res;

import java.util.List;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DiaryChatResponseDto {

    private String id;
    private String model;
    private String role;
    private String stopReason;
    private Integer stopSequence;
    private String type;
    private UsageDTO usage;
    private List<ContentDTO> content;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UsageDTO {

        private Integer inputTokens;
        private Integer outputTokens;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ContentDTO {

        private String text;
        private String type;
    }

}

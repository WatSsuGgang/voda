package io.watssuggang.voda.diary.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiaryChatResponseDto {

  private String id;
  private String model;
  private String role;
  private String stopReason;
  private Integer stopSequence;
  private String type;
  private UsageDTO usage;
  private ContentDTO[] content;

  @Data
  @Builder
  @NoArgsConstructor
  @AllArgsConstructor
  public static class UsageDTO {

    private int inputTokens;
    private int outputTokens;
  }

  @Data
  @Builder
  @NoArgsConstructor
  @AllArgsConstructor
  public static class ContentDTO {

    private String text;
    private String type;
  }

}

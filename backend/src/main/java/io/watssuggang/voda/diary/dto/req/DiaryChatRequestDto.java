package io.watssuggang.voda.diary.dto.req;

import java.util.ArrayList;
import java.util.List;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
public class DiaryChatRequestDto {

  @Builder.Default
  private String model = "claude-3-sonnet-20240229";
  @Builder.Default
  private int max_tokens = 1024;
  private List<MessageDTO> messages = new ArrayList<>();

  @Data
  @Builder
  @AllArgsConstructor
  public static class MessageDTO {

    private String role;
    private String content;
  }
}

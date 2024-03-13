package io.watssuggang.voda.diary.controller;

import io.watssuggang.voda.diary.dto.res.DiaryChatRequestDto;
import io.watssuggang.voda.diary.dto.res.DiaryChatRequestDto.MessageDTO;
import io.watssuggang.voda.diary.dto.res.DiaryChatResponseDto;
import io.watssuggang.voda.diary.service.DiaryService;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/diary")
@RequiredArgsConstructor
public class DiaryController {

  public final DiaryService diaryService;

  @GetMapping("/init")
  public ResponseEntity<?> init() throws Exception {
    List<MessageDTO> message = new ArrayList<>();
    message.add(new MessageDTO("user", PromptHolder.INIT_PROMPT));
    DiaryChatRequestDto dto = DiaryChatRequestDto.builder()
        .model("claude-3-sonnet-20240229")
        .max_tokens(1024)
        .messages(message)
        .build();
    DiaryChatResponseDto result = diaryService.getChat(dto);
    System.out.println(result.toString());
    return ResponseEntity.ok(result);
  }

}

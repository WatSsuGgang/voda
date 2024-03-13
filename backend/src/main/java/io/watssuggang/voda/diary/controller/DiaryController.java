package io.watssuggang.voda.diary.controller;

import io.watssuggang.voda.diary.dto.res.DiaryChatResponseDto;
import io.watssuggang.voda.diary.service.DiaryService;
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
    DiaryChatResponseDto result = diaryService.init();
    return ResponseEntity.ok(result.getContent().get(0).getText());
  }

}

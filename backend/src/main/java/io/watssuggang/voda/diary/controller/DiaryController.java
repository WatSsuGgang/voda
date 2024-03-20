package io.watssuggang.voda.diary.controller;

import io.watssuggang.voda.diary.dto.req.*;
import io.watssuggang.voda.diary.dto.res.*;
import io.watssuggang.voda.diary.service.*;
import java.util.*;
import lombok.*;
import org.springframework.http.*;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/create")
    public ResponseEntity<?> createDiary(@RequestBody TalkListRequest talkList) {
        diaryService.createDiary(talkList.getTalk_list(), talkList.getDiaryId());
        System.out.println("일기 생성 컨트롤러 들어옴!!!");

        return ResponseEntity.ok().build();
    }

    @GetMapping("/chat/{id}")
    public ResponseEntity<Map<String, Object>> getChatList(@PathVariable int id) {
        System.out.println("채팅 리스트 받기");
        Map<String, Object> chatList = diaryService.getChatList(id);

        return ResponseEntity.ok(chatList);
    }

    @PostMapping("/ilgoo")
    public ResponseEntity<?> ilgoo(@RequestBody ChatReq chatReq) {
        System.out.println(chatReq.toString());
        diaryService.ilgoo(chatReq, 1);
        return ResponseEntity.ok().build();
    }
}

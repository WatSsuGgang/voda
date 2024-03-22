package io.watssuggang.voda.diary.controller;

import io.watssuggang.voda.common.security.annotation.CurrentUser;
import io.watssuggang.voda.common.security.dto.SecurityUserDto;
import io.watssuggang.voda.diary.dto.req.*;
import io.watssuggang.voda.diary.dto.res.DiaryDetailResponse;
import io.watssuggang.voda.diary.service.DiaryService;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/diary")
@RequiredArgsConstructor
public class DiaryController {

    public final DiaryService diaryService;

    @GetMapping("/init")
    public ResponseEntity<?> init(@CurrentUser SecurityUserDto userDto) {
        return ResponseEntity.ok(diaryService.init(userDto.getMemberId()));
    }

    @PostMapping("/answer")
    public ResponseEntity<?> answer(@CurrentUser SecurityUserDto userDto,
        @RequestBody DiaryAnswerRequestDto reqDto)
        throws IOException {
        return ResponseEntity.ok(diaryService.answer(reqDto, userDto.getMemberId()));
    }

    @PostMapping("/createImage")
    public ResponseEntity<?> createImageByKarlo(@RequestBody KarloRequest karloRequest) {
        return ResponseEntity.ok(diaryService.createImage(karloRequest));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createDiary(@RequestBody TalkListRequest talkList) {
        return ResponseEntity.ok(diaryService.createDiary(talkList.getTalk_list(),
                talkList.getDiaryId()));
    }

    @GetMapping("/talk/{id}")
    public ResponseEntity<Map<String, Object>> getTalkList(@PathVariable int id) {
        System.out.println("채팅 리스트 받기");
        Map<String, Object> chatList = diaryService.getChatList(id);

        return ResponseEntity.ok(chatList);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<DiaryDetailResponse> getDiaryDetail(@CurrentUser SecurityUserDto userDto,
            @PathVariable int id) {
        System.out.println("일기 상세 정보 받기");

        DiaryDetailResponse diaryDetailResponse = diaryService.getDiaryDetail(userDto.getMemberId(),
                id);

        return ResponseEntity.ok(diaryDetailResponse);
    }

    @GetMapping("/list")
    public ResponseEntity<List<DiaryDetailResponse>> getList(
            @RequestParam(defaultValue = "") LocalDateTime start,
            @RequestParam(defaultValue = "") LocalDateTime end,
            @RequestParam(defaultValue = "NONE") String emotion,
            @CurrentUser SecurityUserDto securityUserDto) {

        List<DiaryDetailResponse> diaryList = diaryService.getDiaryList(start, end, emotion,
                securityUserDto.getMemberId());

        return ResponseEntity.ok(diaryList);
    }

}

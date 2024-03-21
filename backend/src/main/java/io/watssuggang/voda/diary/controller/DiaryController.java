package io.watssuggang.voda.diary.controller;

import io.watssuggang.voda.common.security.annotation.*;
import io.watssuggang.voda.common.security.dto.*;
import io.watssuggang.voda.diary.dto.req.*;
import io.watssuggang.voda.diary.dto.res.*;
import io.watssuggang.voda.diary.service.*;
import java.time.*;
import java.util.*;
import lombok.*;
import org.springframework.http.*;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;
import io.watssuggang.voda.diary.dto.req.KarloRequest;
import io.watssuggang.voda.diary.dto.res.DiaryChatResponseDto;
import io.watssuggang.voda.diary.service.DiaryService;
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
    public ResponseEntity<?> init() throws Exception {
        DiaryChatResponseDto result = diaryService.init();
        return ResponseEntity.ok(result.getContent().get(0).getText());
    }

    @PostMapping("/createImage")
    public ResponseEntity<?> createImageByKarlo(@RequestBody KarloRequest karloRequest) {
        return ResponseEntity.ok(diaryService.createImage(karloRequest));
    }
    @PostMapping("/create")
    public ResponseEntity<?> createDiary(@RequestBody TalkListRequest talkList) {
        System.out.println("일기 생성 컨트롤러 들어옴!!!");
        diaryService.createDiary(talkList.getTalk_list(), talkList.getDiaryId());

        return ResponseEntity.ok().build();
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
    public ResponseEntity<List<DiaryDetailResponse>> getList(@RequestParam LocalDateTime start,
        @RequestParam LocalDateTime end, String emotion,
        @CurrentUser SecurityUserDto securityUserDto) {
        System.out.println("다이어리 리스트 가져오기" + start + " " + end + " " + emotion);

        List<DiaryDetailResponse> diaryList = diaryService.getDiaryList(start, end, emotion,
            securityUserDto.getMemberId());

        return ResponseEntity.ok(diaryList);
    }

}

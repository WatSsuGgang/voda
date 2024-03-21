package io.watssuggang.voda.diary.service;

import io.watssuggang.voda.diary.dto.req.TalkListRequest.*;
import io.watssuggang.voda.diary.dto.res.*;
import java.time.*;
import java.util.*;
import io.watssuggang.voda.diary.dto.req.KarloRequest;
import io.watssuggang.voda.diary.dto.req.KarloResponse;
import io.watssuggang.voda.diary.dto.res.DiaryChatResponseDto;

public interface DiaryService {

  DiaryChatResponseDto init(); //claude 호출

    Map<String, Object> getChatList(int id);

    void createDiary(List<TalkRequest> talkList, int diaryId);

    DiaryDetailResponse getDiaryDetail(int memberId, int id);

    List<DiaryDetailResponse> getDiaryList(LocalDateTime start, LocalDateTime end, String emotion,
        int memberId);

  KarloResponse createImage(KarloRequest karloRequest);

//  String fileToString(File file) throws IOException; //STT 호출


}

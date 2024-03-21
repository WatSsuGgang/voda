package io.watssuggang.voda.diary.service;

import io.watssuggang.voda.diary.dto.req.TalkListRequest.TalkRequest;
import io.watssuggang.voda.diary.dto.res.DiaryChatResponseDto;
import io.watssuggang.voda.diary.dto.res.DiaryDetailResponse;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface DiaryService {

    DiaryChatResponseDto init(); //claude 호출

    Map<String, Object> getChatList(int id);

    void createDiary(List<TalkRequest> talkList, int diaryId);

    DiaryDetailResponse getDiaryDetail(int memberId, int id);

    List<DiaryDetailResponse> getDiaryList(LocalDateTime start, LocalDateTime end, String emotion,
        int memberId);

//  String fileToString(File file) throws IOException; //STT 호출

}

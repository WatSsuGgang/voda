package io.watssuggang.voda.diary.service;

import io.watssuggang.voda.diary.dto.req.*;
import io.watssuggang.voda.diary.dto.req.TalkListRequest.TalkRequest;
import io.watssuggang.voda.diary.dto.res.*;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import org.springframework.web.multipart.MultipartFile;


public interface DiaryService {

    DiaryTtsResponseDto init(Integer userId);

//    DiaryTtsResponseDto answer(DiaryAnswerRequestDto reqDto, Integer userId)
//        throws IOException;
DiaryTtsResponseDto answer(MultipartFile file, Integer diaryId, Integer userId)
    throws IOException;

    Map<String, Object> getChatList(int id, Integer memberId);

    DiaryCreateResponse createDiary(List<TalkRequest> talkList, int diaryId, Integer memberId);

    DiaryDetailResponse getDiaryDetail(Integer memberId, int id);

    List<DiaryDetailResponse> getDiaryList(LocalDateTime start, LocalDateTime end, String emotion,
        Integer memberId);

    KarloResponse createImage(KarloRequest karloRequest);


}

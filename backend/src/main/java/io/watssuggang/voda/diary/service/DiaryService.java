package io.watssuggang.voda.diary.service;

import io.watssuggang.voda.diary.dto.req.TalkListRequest.*;
import io.watssuggang.voda.diary.dto.res.*;
import java.util.*;

public interface DiaryService {

    DiaryChatResponseDto init(); //claude 호출

    Map<String, Object> getChatList(int id);

    void createDiary(List<TalkReq> talkList, int diaryId);

//  String fileToString(File file) throws IOException; //STT 호출
    
}

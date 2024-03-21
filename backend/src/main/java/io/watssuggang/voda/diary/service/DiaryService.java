package io.watssuggang.voda.diary.service;

import io.watssuggang.voda.diary.dto.req.KarloRequest;
import io.watssuggang.voda.diary.dto.req.KarloResponse;
import io.watssuggang.voda.diary.dto.res.DiaryChatResponseDto;

public interface DiaryService {

  DiaryChatResponseDto init(); //claude 호출

  KarloResponse createImage(KarloRequest karloRequest);

//  String fileToString(File file) throws IOException; //STT 호출


}

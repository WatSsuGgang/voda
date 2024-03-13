package io.watssuggang.voda.diary.service;

import io.watssuggang.voda.diary.dto.res.DiaryChatRequestDto;
import io.watssuggang.voda.diary.dto.res.DiaryChatResponseDto;

public interface DiaryService {

  DiaryChatResponseDto getChat(DiaryChatRequestDto dto); //claude 호출

//  String fileToString(File file) throws IOException; //STT 호출


}

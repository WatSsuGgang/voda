package io.watssuggang.voda.diary.dto.res;

import lombok.Getter;

@Getter
public class DiaryCreateResponse {

    private final Integer diaryId;
    private final String message;

    private DiaryCreateResponse(Integer diaryId, String message) {
        this.diaryId = diaryId;
        this.message = message;
    }

    public static DiaryCreateResponse of(Integer diaryId, String message){
        return new DiaryCreateResponse(diaryId, message);
    }
}

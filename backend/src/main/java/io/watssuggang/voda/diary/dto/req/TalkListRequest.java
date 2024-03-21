package io.watssuggang.voda.diary.dto.req;

import java.util.*;
import lombok.*;

@Getter
@Setter
@ToString
public class TalkListRequest {

    private int diaryId;
    private List<TalkRequest> talk_list;

    @Getter
    @ToString
    public static class TalkRequest {

        private final String question;
        private final String answer;

        public TalkRequest(String question, String answer) {
            this.question = question;
            this.answer = answer;
        }
    }
}
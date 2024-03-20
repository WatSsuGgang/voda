package io.watssuggang.voda.diary.dto.req;

import java.util.*;
import lombok.*;

@Getter
@Setter
@ToString
public class TalkListRequest {

    private int diaryId;
    private List<TalkReq> talk_list;

    @Getter
    @ToString
    public static class TalkReq {

        private String q;
        private String a;

    }
}
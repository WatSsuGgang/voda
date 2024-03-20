package io.watssuggang.voda.diary.dto.req;

import java.util.*;
import lombok.*;

@Getter
@Setter
@ToString
public class TalkListRequest {

    private int diaryId;
    private List<Talk> talk_list;

    @Getter
    @ToString
    public static class Talk {

        private String q;
        private String a;

    }
}
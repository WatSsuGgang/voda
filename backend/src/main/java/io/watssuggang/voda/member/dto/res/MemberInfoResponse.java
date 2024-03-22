package io.watssuggang.voda.member.dto.res;

import lombok.*;

@Data
@AllArgsConstructor
@Builder
public class MemberInfoResponse {

    private String nickname;
    private Integer coins;
    private Integer diaryStreak;
}

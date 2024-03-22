package io.watssuggang.voda.member.dto.res;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class MemberInfoResponse {

    private final String nickname;
    private final Integer coins;
    private final Integer diaryStreak;
}

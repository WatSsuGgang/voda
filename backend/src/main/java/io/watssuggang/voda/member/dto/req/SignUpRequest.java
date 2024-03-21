package io.watssuggang.voda.member.dto.req;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class SignUpRequest {

    private String email;
    private String nickname;
    private String provider;
}

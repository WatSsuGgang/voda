package io.watssuggang.voda.member.dto.req;

import lombok.*;

@Getter
@ToString
public class SignUpRequest {

    private String email;
    private String nickname;
    private String provider;
}

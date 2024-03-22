package io.watssuggang.voda.common.jwt.dto;

import lombok.*;

@Getter
@AllArgsConstructor
public class GeneratedToken {

    private String accessToken;
    private String refreshToken;
}

package io.watssuggang.voda.common.jwt.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GeneratedToken {

    private String accessToken;
    private String refreshToken;
}

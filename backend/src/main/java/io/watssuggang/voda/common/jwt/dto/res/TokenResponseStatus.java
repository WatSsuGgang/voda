package io.watssuggang.voda.common.jwt.dto.res;

import lombok.AllArgsConstructor;
import lombok.Getter;


// 토큰 응답 상태값
@AllArgsConstructor
@Getter
public class TokenResponseStatus {

    private Integer status;
    private String accessToken;

    public static TokenResponseStatus addStatus(Integer status, String accessToken) {
        return new TokenResponseStatus(status, accessToken);
    }
}

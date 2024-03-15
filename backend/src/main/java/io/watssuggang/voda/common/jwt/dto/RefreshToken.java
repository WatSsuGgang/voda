package io.watssuggang.voda.common.jwt.dto;

import jakarta.persistence.*;
import java.io.*;
import lombok.*;
import org.springframework.data.redis.core.*;
import org.springframework.data.redis.core.index.*;


@Getter
@AllArgsConstructor
@RedisHash(value = "jwtToken", timeToLive = 60 * 60 * 24 * 7)
public class RefreshToken implements Serializable {

    @Id
    private String id;

    // Indexed 어노테이션을 붙이면 findBy가 가능해짐
    @Indexed
    private String accessToken;

    private String refreshToken;

    public void updateAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}

package io.watssuggang.voda.common.jwt.dto;

import jakarta.persistence.Id;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;


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

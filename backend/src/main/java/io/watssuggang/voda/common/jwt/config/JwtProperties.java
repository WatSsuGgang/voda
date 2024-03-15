package io.watssuggang.voda.common.jwt.config;

import lombok.*;
import org.springframework.boot.context.properties.*;
import org.springframework.stereotype.*;

@Data
@Component
@ConfigurationProperties(prefix = "spring.jwt")
public class JwtProperties {

    private String secret;
}

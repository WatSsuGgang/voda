package io.watssuggang.voda.common.security.dto;

import lombok.*;

@Getter
@AllArgsConstructor
@Builder
public class SecurityUserDto {

    private String email;
    private String nickname;
    private String role;
    private Integer memberId;
}
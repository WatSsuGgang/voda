package io.watssuggang.voda.common.security.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class SecurityUserDto {

    private String email;
    private String nickname;
    private String role;
    private Integer memberId;
}
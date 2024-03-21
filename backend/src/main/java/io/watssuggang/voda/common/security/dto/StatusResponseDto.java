package io.watssuggang.voda.common.security.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL) // DTO 를 JSON으로 변환 시 null값인 field 제외
public class StatusResponseDto {

    private Integer status;
    private Object data;

    public StatusResponseDto(Integer status) {
        this.status = status;
    }

    public static StatusResponseDto addStatus(Integer status) {
        return new StatusResponseDto(status);
    }
}

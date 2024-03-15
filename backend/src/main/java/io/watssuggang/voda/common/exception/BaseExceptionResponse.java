package io.watssuggang.voda.common.exception;

import lombok.Builder;
import lombok.Getter;

@Getter
public class BaseExceptionResponse {

    private final int errorCode;
    private final String errorMessage;

    @Builder
    public BaseExceptionResponse(int errorCode, String errorMessage) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}

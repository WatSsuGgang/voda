package io.watssuggang.voda.common.exception;

public class BaseException extends RuntimeException{

    ErrorCode errorCode;

    public BaseException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }
}

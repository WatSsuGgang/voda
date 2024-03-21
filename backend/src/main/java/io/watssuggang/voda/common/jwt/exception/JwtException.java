package io.watssuggang.voda.common.jwt.exception;

import io.watssuggang.voda.common.exception.BaseException;
import io.watssuggang.voda.common.exception.ErrorCode;

public class JwtException extends BaseException {

    public JwtException() {
        super(ErrorCode.TOKEN_NOT_AVAILABLE);
    }
}

package io.watssuggang.voda.pet.exception;

import io.watssuggang.voda.common.exception.BaseException;
import io.watssuggang.voda.common.exception.ErrorCode;

public class OwnException extends BaseException {

    public OwnException(ErrorCode errorCode) {
        super(errorCode);
    }
}

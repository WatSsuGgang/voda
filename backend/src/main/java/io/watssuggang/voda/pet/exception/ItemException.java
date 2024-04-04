package io.watssuggang.voda.pet.exception;

import io.watssuggang.voda.common.exception.BaseException;
import io.watssuggang.voda.common.exception.ErrorCode;

public class ItemException extends BaseException {

    public ItemException(ErrorCode errorCode) {
        super(errorCode);
    }
}

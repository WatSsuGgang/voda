package io.watssuggang.voda.pet.exception;

import io.watssuggang.voda.common.exception.BaseException;
import io.watssuggang.voda.common.exception.ErrorCode;

public class PetException extends BaseException {

    public PetException(ErrorCode errorCode) {
        super(errorCode);
    }
}

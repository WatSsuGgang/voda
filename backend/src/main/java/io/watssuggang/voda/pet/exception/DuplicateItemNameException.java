package io.watssuggang.voda.pet.exception;

import io.watssuggang.voda.common.exception.BaseException;
import io.watssuggang.voda.common.exception.ErrorCode;

public class DuplicateItemNameException extends BaseException {

    public DuplicateItemNameException() {
        super(ErrorCode.DUPLICATE_ITEM_NAME);
    }
}

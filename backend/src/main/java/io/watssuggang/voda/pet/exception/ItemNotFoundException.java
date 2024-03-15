package io.watssuggang.voda.pet.exception;

import io.watssuggang.voda.common.exception.BaseException;
import io.watssuggang.voda.common.exception.ErrorCode;

public class ItemNotFoundException extends BaseException {

    public ItemNotFoundException() {
        super(ErrorCode.ITEM_NOT_FOUND);
    }
}

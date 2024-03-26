package io.watssuggang.voda.diary.exception;

import io.watssuggang.voda.common.exception.BaseException;
import io.watssuggang.voda.common.exception.ErrorCode;

public class DiaryException extends BaseException {

    public DiaryException(ErrorCode errorCode) {
        super(errorCode);
    }

}

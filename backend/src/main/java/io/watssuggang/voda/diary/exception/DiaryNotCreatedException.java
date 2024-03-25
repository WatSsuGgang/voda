package io.watssuggang.voda.diary.exception;

import io.watssuggang.voda.common.exception.BaseException;
import io.watssuggang.voda.common.exception.ErrorCode;

public class DiaryNotCreatedException extends BaseException {

    public DiaryNotCreatedException(ErrorCode errorCode) {
        super(errorCode);
    }

}

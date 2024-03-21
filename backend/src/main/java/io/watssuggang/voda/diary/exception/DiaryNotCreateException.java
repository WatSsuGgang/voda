package io.watssuggang.voda.diary.exception;

import io.watssuggang.voda.common.exception.*;

public class DiaryNotCreateException extends BaseException {

    public DiaryNotCreateException() {
        super(ErrorCode.DIARY_NOT_CREATED);
    }

}

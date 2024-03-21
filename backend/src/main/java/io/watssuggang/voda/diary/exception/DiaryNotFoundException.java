package io.watssuggang.voda.diary.exception;

import io.watssuggang.voda.common.exception.*;

public class DiaryNotFoundException extends BaseException {

    public DiaryNotFoundException() {
        super(ErrorCode.DIARY_NOT_FOUND);
    }
}

package io.watssuggang.voda.member.exception;

import io.watssuggang.voda.common.exception.*;

public class MemberNotFoundException extends BaseException {

    public MemberNotFoundException() {
        super(ErrorCode.MEMBER_NOT_FOUND);
    }
}

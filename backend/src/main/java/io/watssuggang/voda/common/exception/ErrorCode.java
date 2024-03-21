package io.watssuggang.voda.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    DUPLICATE_ITEM_NAME(HttpStatus.CONFLICT, "이미 존재하는 아이템 이름입니다."),
    ITEM_NOT_FOUND(HttpStatus.NOT_FOUND, "아이템을 찾을 수 없습니다."),
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "멤버를 찾을 수 없습니다."),
    TOKEN_NOT_AVAILABLE(HttpStatus.UNAUTHORIZED, "JWT 토큰이 만료되었습니다."),
    DIARY_NOT_CREATED(HttpStatus.NOT_FOUND, "일기 생성에 실패했습니다."),
    DIARY_NOT_FOUND(HttpStatus.NOT_FOUND, "일기를 찾을 수 없습니다.");

    private final HttpStatus status;
    private final String message;

    ErrorCode(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }
}

package io.watssuggang.voda.common.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionAdvice {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    private ResponseEntity<ValidationErrorResponse> handleValidationExceptions(
            MethodArgumentNotValidException e
    ) {
        ValidationErrorResponse errorResponse = new ValidationErrorResponse();
        e.getBindingResult().getFieldErrors().forEach(
                fieldError -> errorResponse.addFieldError(
                        fieldError.getField(),
                        fieldError.getDefaultMessage()
                )
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    @ExceptionHandler(BaseException.class)
    private ResponseEntity<BaseExceptionResponse> handleBaseException(BaseException e) {
        return ResponseEntity.status(e.errorCode.getStatus())
                .body(BaseExceptionResponse.builder()
                        .errorCode(e.errorCode.getStatus().value())
                        .errorMessage(e.errorCode.getMessage())
                        .build());
    }
}

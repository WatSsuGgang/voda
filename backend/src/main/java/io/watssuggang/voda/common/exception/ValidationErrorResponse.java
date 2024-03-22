package io.watssuggang.voda.common.exception;

import java.util.HashMap;
import java.util.Map;
import lombok.Getter;

@Getter
public class ValidationErrorResponse {
    private final Map<String, String> fieldErrors = new HashMap<>();

    public void addFieldError(String field, String message) {
        fieldErrors.put(field, message);
    }
}
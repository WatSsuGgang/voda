package io.watssuggang.voda.common.jwt.exception;

public class JwtException extends RuntimeException {

    public JwtException(String message) {
        super("JWT Token Exception: " + message);
    }
}

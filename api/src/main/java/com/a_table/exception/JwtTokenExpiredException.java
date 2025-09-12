package com.a_table.exception;

public class JwtTokenExpiredException extends RuntimeException {

    public JwtTokenExpiredException() {
        super("JWT token has expired");
    }
}

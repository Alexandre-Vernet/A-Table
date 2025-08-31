package com.a_table.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorResponseException extends RuntimeException {
    private String error;

    public ErrorResponseException(String message) {
        super(message);
    }
}

package com.a_table.exception;

import org.springframework.http.HttpStatus;

public class UserAlreadyExistException extends ApiException {

    public UserAlreadyExistException() {
        super("USER_ALREADY_EXIST", "Cet email existe déjà", HttpStatus.CONFLICT);
    }
}

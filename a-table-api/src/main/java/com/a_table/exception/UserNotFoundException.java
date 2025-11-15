package com.a_table.exception;

import org.springframework.http.HttpStatus;

public class UserNotFoundException extends ApiException {

    public UserNotFoundException() {
        super("USER_DOESNT_EXIST", "Cet utilisateur n'existe pas", HttpStatus.NOT_FOUND);
    }
}

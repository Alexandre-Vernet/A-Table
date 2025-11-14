package com.a_table.exception;

import org.springframework.http.HttpStatus;

public class AccountDeactivateException extends ApiException {

    public AccountDeactivateException() {
        super("ACCOUNT_DEACTIVATE", "Ce compte a été désactivé", HttpStatus.FORBIDDEN);
    }
}

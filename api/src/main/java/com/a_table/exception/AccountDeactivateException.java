package com.a_table.exception;

public class AccountDeactivateException extends RuntimeException {

    public AccountDeactivateException() {
        super("Ce compte a été désactivé");
    }
}

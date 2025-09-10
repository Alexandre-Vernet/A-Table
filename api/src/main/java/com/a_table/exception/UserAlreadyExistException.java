package com.a_table.exception;

public class UserAlreadyExistException extends RuntimeException {

    public UserAlreadyExistException() {
        super("Cet email existe déjà");
    }
}

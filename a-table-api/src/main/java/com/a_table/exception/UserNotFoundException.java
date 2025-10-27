package com.a_table.exception;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException() {
        super("Cet utilisateur n'existe pas");
    }
}

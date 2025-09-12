package com.a_table.exception;

public class RequireAuthException extends RuntimeException {

    public RequireAuthException() {
        super("Vous devez être connecté pour continuer");
    }
}

package com.a_table.exception;

public class RequireAuthException extends RuntimeException {

    public RequireAuthException() {
        super("Authentification requis");
    }
}

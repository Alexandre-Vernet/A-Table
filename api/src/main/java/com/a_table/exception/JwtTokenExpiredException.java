package com.a_table.exception;

public class JwtTokenExpiredException extends RuntimeException {

    public JwtTokenExpiredException() {
        super("Votre session a expiré, veuillez vous reconnecter");
    }
}

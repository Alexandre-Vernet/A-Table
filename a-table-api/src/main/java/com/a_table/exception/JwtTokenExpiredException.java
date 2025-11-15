package com.a_table.exception;

import org.springframework.http.HttpStatus;

public class JwtTokenExpiredException extends ApiException {

    public JwtTokenExpiredException() {
        super("TOKEN_EXPIRE", "Votre session a expiré, veuillez vous reconnecter", HttpStatus.UNAUTHORIZED);
    }
}

package com.a_table.exception;

import com.a_table.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(SecurityException.class)
    public ResponseEntity<?> handleBadCategory(SecurityException securityException) {
        return new ResponseEntity<>(new ErrorResponse("AUTHENTICATION_NEEDED", securityException.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<?> handleBadCategory(ApiException apiException) {
        return new ResponseEntity<>(new ErrorResponse(apiException.getCode(), apiException.getMessage()), apiException.getStatus());
    }
}

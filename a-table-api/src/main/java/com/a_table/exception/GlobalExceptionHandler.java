package com.a_table.exception;

import com.a_table.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RecipeNotFoundException.class)
    public ResponseEntity<?> handleRecipeNotFoundException(RecipeNotFoundException ex) {
        return new ResponseEntity<>(
                new ErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND.value(), "RECIPE_NOT_FOUND"),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(InvalidCategoryException.class)
    public ResponseEntity<?> handleBadCategory(InvalidCategoryException ex) {
        return new ResponseEntity<>(
                new ErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST.value(), "INVALID_CATEGORY"),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(UserAlreadyExistException.class)
    public ResponseEntity<?> handleBadCategory(UserAlreadyExistException ex) {
        return new ResponseEntity<>(
                new ErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST.value(), "USER_ALREADY_EXIST"),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(RecipeCantBeDeleted.class)
    public ResponseEntity<?> handleBadCategory(RecipeCantBeDeleted ex) {
        return new ResponseEntity<>(
                new ErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST.value(), "IMPOSSIBLE_DELETE_RECIPE"),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<?> handleBadCategory(UserNotFoundException ex) {
        return new ResponseEntity<>(
                new ErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST.value(), "USER_DOESNT_EXIST"),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(JwtTokenExpiredException.class)
    public ResponseEntity<?> handleBadCategory(JwtTokenExpiredException ex) {
        return new ResponseEntity<>(
                new ErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST.value(), "TOKEN_EXPIRE"),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(AccountDeactivateException.class)
    public ResponseEntity<?> handleBadCategory(AccountDeactivateException ex) {
        return new ResponseEntity<>(
                new ErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST.value(), "ACCOUNT_DEACTIVATE"),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(SecurityException.class)
    public ResponseEntity<?> handleBadCategory(SecurityException ex) {
        return new ResponseEntity<>(
                new ErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST.value(), "AUTHENTICATION_NEEDED"),
                HttpStatus.BAD_REQUEST
        );
    }
}

package com.a_table.exception;

public class RecipeNotFoundException extends RuntimeException {

    public RecipeNotFoundException(Long id) {
        super("Cette recette n'existe pas " + id);
    }
}

package com.a_table.exception;

public class RecipeNotFoundException extends RuntimeException {

    public RecipeNotFoundException() {
        super("Cette recette n'existe pas");
    }
}

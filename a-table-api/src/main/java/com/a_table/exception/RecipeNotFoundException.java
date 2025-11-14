package com.a_table.exception;

import org.springframework.http.HttpStatus;

public class RecipeNotFoundException extends ApiException {

    public RecipeNotFoundException() {
        super("RECIPE_NOT_FOUND", "Cette recette n'existe pas", HttpStatus.NOT_FOUND);
    }
}

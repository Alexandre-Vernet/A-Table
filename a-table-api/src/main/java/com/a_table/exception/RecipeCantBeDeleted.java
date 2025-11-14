package com.a_table.exception;

import org.springframework.http.HttpStatus;

public class RecipeCantBeDeleted extends ApiException {

    public RecipeCantBeDeleted() {
        super("IMPOSSIBLE_DELETE_RECIPE", "Impossible de supprimer cette recette", HttpStatus.UNAUTHORIZED);
    }
}

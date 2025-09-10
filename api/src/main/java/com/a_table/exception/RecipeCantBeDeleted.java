package com.a_table.exception;

public class RecipeCantBeDeleted extends RuntimeException {

    public RecipeCantBeDeleted() {
        super("Impossible de supprimer cette recette");
    }
}

package com.a_table.exception;

import com.a_table.dto.Category;
import org.springframework.http.HttpStatus;

import java.util.Arrays;
import java.util.stream.Collectors;

public class InvalidCategoryException extends ApiException {

    public InvalidCategoryException() {
        super("INVALID_CATEGORY", getErrorMsg(), HttpStatus.BAD_REQUEST);
    }

    private static String getErrorMsg() {
        String allowedCategories = Arrays.stream(Category.values())
                .map(Category::getLabel)
                .collect(Collectors.joining(", "));

        return "Catégorie invalide, seule les catégories " + allowedCategories + " sont autorisées";
    }
}

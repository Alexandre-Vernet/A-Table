package com.a_table.dto;

import java.util.Arrays;

public enum Category {
    ENTREE("entrée"),
    PLAT("plat"),
    DESSERT("dessert"),
    PETIT_DEJEUNER("petit déjeuner"),
    AUTRE("autre");

    private final String value;

    Category(String value) {
        this.value = value;
    }

    public static boolean categoryValid(String category) {
       return Arrays.stream(Category.values())
               .anyMatch(c -> c.value.equalsIgnoreCase(category));
    }

    public String getLabel() {
        return value;
    }
}

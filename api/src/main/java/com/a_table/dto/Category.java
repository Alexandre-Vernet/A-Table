package com.a_table.dto;

import java.util.Arrays;

public enum Category {
    ENTREE("starter"),
    PLAT("lunch"),
    DESSERT("dessert"),
    PETIT_DEJEUNER("breakfast"),
    AUTRE("other");

    private final String value;

    Category(String value) {
        this.value = value;
    }

    public static boolean categoryValid(String category) {
       return Arrays.stream(Category.values())
               .anyMatch(c -> c.value.equalsIgnoreCase(category));
    }
}

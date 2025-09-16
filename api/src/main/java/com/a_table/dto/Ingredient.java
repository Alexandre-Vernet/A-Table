package com.a_table.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Ingredient {

    private Long id;

    private String ingredient;

    private String quantity;

    private String unit;

    @JsonBackReference
    Recipe recipe;
}

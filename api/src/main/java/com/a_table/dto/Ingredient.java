package com.a_table.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Ingredient {

    private Long id;

    private String name;

    private Integer quantity;

    private String unit;

    @JsonBackReference
    Recipe recipe;
}

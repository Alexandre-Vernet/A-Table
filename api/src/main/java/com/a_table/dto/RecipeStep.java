package com.a_table.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecipeStep {

    private Long id;

    private Integer stepNumber;

    private String description;

    @JsonBackReference
    Recipe recipe;
}

package com.a_table.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecipeStep {

    private Long id;

    private Integer stepNumber;

    private String description;

    Recipe recipe;
}

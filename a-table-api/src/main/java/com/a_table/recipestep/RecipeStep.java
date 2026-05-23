package com.a_table.recipestep;

import com.a_table.recipe.Recipe;
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

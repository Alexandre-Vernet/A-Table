package com.a_table.config.mapper;

import com.a_table.dto.RecipeStep;
import com.a_table.model.RecipeStepEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class RecipeStepMapper {

    public RecipeStepEntity dtoToEntity(RecipeStep recipeStep) {
        return RecipeStepEntity.builder()
                .id(recipeStep.getId())
                .stepNumber(recipeStep.getStepNumber())
                .description(recipeStep.getDescription())
                .build();
    }

    public List<RecipeStepEntity> dtoToEntity(List<RecipeStep> recipeStepList) {
        return recipeStepList.stream()
                .map(this::dtoToEntity)
                .collect(Collectors.toList());
    }
}

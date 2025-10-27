package com.a_table.config.mapper;

import com.a_table.dto.Ingredient;
import com.a_table.model.IngredientEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class IngredientMapper {

    public IngredientEntity dtoToEntity(Ingredient ingredient) {
        return IngredientEntity.builder()
                .id(ingredient.getId())
                .name(ingredient.getName())
                .quantity(ingredient.getQuantity())
                .unit(ingredient.getUnit())
                .build();
    }

    public List<IngredientEntity> dtoToEntity(List<Ingredient> ingredientList) {
        return ingredientList.stream()
                .map(this::dtoToEntity)
                .collect(Collectors.toList());
    }
}

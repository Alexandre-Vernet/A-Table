package com.a_table.config.mapper;

import com.a_table.dto.Ingredient;
import com.a_table.dto.Recipe;
import com.a_table.dto.RecipeStep;
import com.a_table.dto.User;
import com.a_table.model.IngredientEntity;
import com.a_table.model.RecipeEntity;
import com.a_table.model.RecipeStepEntity;
import com.a_table.model.UserEntity;
import org.springframework.stereotype.Component;
import java.util.List;


@Component
public class RecipeMapper {

    public Recipe entityToDto(RecipeEntity recipeEntity) {
        return Recipe.builder()
                .id(recipeEntity.getId())
                .name(recipeEntity.getName())
                .nbPerson(recipeEntity.getNbPerson())
                .category(recipeEntity.getCategory())
                .preparationTime(recipeEntity.getPreparationTime())
                .cookingTime(recipeEntity.getCookingTime())
                .note(recipeEntity.getNote())
                .image(recipeEntity.getImageBase64())
                .user(
                        User.builder()
                                .id(recipeEntity.getUser().getId())
                                .lastName(recipeEntity.getUser().getLastName())
                                .firstName(recipeEntity.getUser().getFirstName())
                                .build()
                )
                .ingredients(
                        recipeEntity.getIngredients().stream()
                                .map(ingredient ->
                                        Ingredient.builder()
                                                .id(ingredient.getId())
                                                .name(ingredient.getName())
                                                .quantity(ingredient.getQuantity())
                                                .unit(ingredient.getUnit())
                                                .build()
                                )
                                .toList()
                )
                .steps(
                        recipeEntity.getSteps().stream()
                                .map(step ->
                                        RecipeStep.builder()
                                                .id(step.getId())
                                                .stepNumber(step.getStepNumber())
                                                .description(step.getDescription())
                                                .build()
                                )
                                .toList()
                )
                .build();
    }

    public RecipeEntity dtoToEntity(Recipe recipe) {
        return RecipeEntity.builder()
                .id(recipe.getId())
                .name(recipe.getName())
                .nbPerson(recipe.getNbPerson())
                .category(recipe.getCategory())
                .preparationTime(recipe.getPreparationTime())
                .cookingTime(recipe.getCookingTime())
                .note(recipe.getNote())
                .imageBase64(recipe.getImage())
                .user(
                        UserEntity.builder()
                                .id(recipe.getUser().getId())
                                .lastName(recipe.getUser().getLastName())
                                .firstName(recipe.getUser().getFirstName())
                                .build()
                )
                .ingredients(
                        recipe.getIngredients().stream()
                                .map(ingredient ->
                                        IngredientEntity.builder()
                                                .id(ingredient.getId())
                                                .name(ingredient.getName())
                                                .quantity(ingredient.getQuantity())
                                                .unit(ingredient.getUnit())
                                                .build()
                                )
                                .toList()
                )
                .steps(
                        recipe.getSteps().stream()
                                .map(step ->
                                        RecipeStepEntity.builder()
                                                .id(step.getId())
                                                .stepNumber(step.getStepNumber())
                                                .description(step.getDescription())
                                                .build()
                                )
                                .toList()
                )
                .build();
    }

    public List<Recipe> entityToDtoList(List<RecipeEntity> recipeEntityList) {
        return recipeEntityList.stream()
                .map(this::entityToDto)
                .toList();
    }
}
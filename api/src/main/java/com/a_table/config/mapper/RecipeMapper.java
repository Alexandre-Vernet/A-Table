package com.a_table.config.mapper;

import com.a_table.dto.Recipe;
import com.a_table.dto.User;
import com.a_table.model.IngredientEntity;
import com.a_table.model.RecipeEntity;
import com.a_table.model.RecipeStepEntity;
import com.a_table.model.UserEntity;
import org.springframework.stereotype.Component;

import java.util.Base64;
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
                .image(recipeEntity.getImage() != null ? "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(recipeEntity.getImage()) : null)
                .user(
                        User.builder()
                                .id(recipeEntity.getUser().getId())
                                .lastName(recipeEntity.getUser().getLastName())
                                .firstName(recipeEntity.getUser().getFirstName())
                                .build()
                )
                .build();
    }

    public RecipeEntity dtoToEntity(Recipe recipe) {
        RecipeEntity recipeEntity = RecipeEntity.builder()
                .id(recipe.getId())
                .name(recipe.getName())
                .nbPerson(recipe.getNbPerson())
                .category(recipe.getCategory())
                .preparationTime(recipe.getPreparationTime())
                .cookingTime(recipe.getCookingTime())
                .note(recipe.getNote())
                .image(recipe.getImageBytes())
                .user(
                        UserEntity.builder()
                                .id(recipe.getUser().getId())
                                .lastName(recipe.getUser().getLastName())
                                .firstName(recipe.getUser().getFirstName())
                                .build()
                )
                .build();

        List<IngredientEntity> ingredients = recipe.getIngredients().stream()
                .map(ingredient ->
                        IngredientEntity.builder()
                                .id(ingredient.getId())
                                .name(ingredient.getName())
                                .quantity(ingredient.getQuantity())
                                .unit(ingredient.getUnit())
                                .recipe(recipeEntity)
                                .build()
                )
                .toList();
        recipeEntity.setIngredients(ingredients);

        List<RecipeStepEntity> steps = recipe.getSteps().stream()
                .map(step ->
                        RecipeStepEntity.builder()
                                .id(step.getId())
                                .stepNumber(step.getStepNumber())
                                .description(step.getDescription())
                                .recipe(recipeEntity)
                                .build()
                )
                .toList();
        recipeEntity.setSteps(steps);

        return recipeEntity;
    }

    public List<Recipe> entityToDtoList(List<RecipeEntity> recipeEntityList) {
        return recipeEntityList.stream()
                .map(this::entityToDto)
                .toList();
    }


    public void concat(Recipe recipe, RecipeEntity existingRecipeEntity) {
        if (recipe.getName() != null) {
            existingRecipeEntity.setName(recipe.getName());
        }
        if (recipe.getNbPerson() != null) {
            existingRecipeEntity.setNbPerson(recipe.getNbPerson());
        }
        if (recipe.getCategory() != null) {
            existingRecipeEntity.setCategory(recipe.getCategory());
        }
        if (recipe.getPreparationTime() != null) {
            existingRecipeEntity.setPreparationTime(recipe.getPreparationTime());
        }
        if (recipe.getCookingTime() != null) {
            existingRecipeEntity.setCookingTime(recipe.getCookingTime());
        }
        if (recipe.getNote() != null) {
            existingRecipeEntity.setNote(recipe.getNote());
        }

    }
}
package com.a_table.config.mapper;

import com.a_table.dto.Ingredient;
import com.a_table.dto.Recipe;
import com.a_table.dto.RecipeStep;
import com.a_table.dto.User;
import com.a_table.model.IngredientEntity;
import com.a_table.model.RecipeEntity;
import com.a_table.model.RecipeStepEntity;
import com.a_table.model.UserEntity;
import com.a_table.utils.ImageUtils;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;


@Component
public class RecipeMapper {

    @Resource
    IngredientMapper ingredientMapper;

    @Resource
    RecipeStepMapper recipeStepMapper;

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
                        recipe.getUser() != null ?
                                UserEntity.builder()
                                        .id(recipe.getUser().getId())
                                        .lastName(recipe.getUser().getLastName())
                                        .firstName(recipe.getUser().getFirstName())
                                        .build() : null
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
        } else {
            existingRecipeEntity.setPreparationTime(null);
        }

        if (recipe.getCookingTime() != null) {
            existingRecipeEntity.setCookingTime(recipe.getCookingTime());
        } else {
            existingRecipeEntity.setCookingTime(null);
        }

        if (recipe.getNote() != null) {
            existingRecipeEntity.setNote(recipe.getNote());
        }
        if (recipe.getImage() != null && recipe.getImage().startsWith("data:image")) {
            String base64Image = recipe.getImage().split(",")[1];
            byte[] imageBytes = Base64.getDecoder().decode(base64Image);
            existingRecipeEntity.setImage(ImageUtils.convertPngToJpeg(imageBytes));
        } else {
            existingRecipeEntity.setImage(null);
        }

        if (recipe.getIngredients() != null) {
            if (existingRecipeEntity.getIngredients() == null) {
                existingRecipeEntity.setIngredients(new ArrayList<>());
            }

            Map<Long, IngredientEntity> existingById = existingRecipeEntity.getIngredients()
                    .stream()
                    .filter(i -> i.getId() != null)
                    .collect(Collectors.toMap(IngredientEntity::getId, Function.identity(), (a, b) -> a));


            Set<Long> incomingIds = recipe.getIngredients().stream()
                    .map(Ingredient::getId)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toSet());

            existingRecipeEntity.getIngredients().removeIf(e -> e.getId() != null && !incomingIds.contains(e.getId()));

            for (Ingredient dto : recipe.getIngredients()) {
                if (dto.getId() != null && existingById.containsKey(dto.getId())) {
                    IngredientEntity existing = existingById.get(dto.getId());
                    existing.setName(dto.getName());
                    existing.setQuantity(dto.getQuantity());
                    existing.setUnit(dto.getUnit());
                } else {
                    IngredientEntity newEntity = ingredientMapper.dtoToEntity(dto);
                    newEntity.setRecipe(existingRecipeEntity);
                    existingRecipeEntity.getIngredients().add(newEntity);
                }
            }
        }

        if (recipe.getSteps() != null) {
            if (existingRecipeEntity.getSteps() == null) {
                existingRecipeEntity.setIngredients(new ArrayList<>());
            }

            Map<Long, RecipeStepEntity> existingById = existingRecipeEntity.getSteps()
                    .stream()
                    .filter(i -> i.getId() != null)
                    .collect(Collectors.toMap(RecipeStepEntity::getId, Function.identity(), (a, b) -> a));


            Set<Long> incomingIds = recipe.getSteps().stream()
                    .map(RecipeStep::getId)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toSet());

            existingRecipeEntity.getSteps().removeIf(e -> e.getId() != null && !incomingIds.contains(e.getId()));

            for (RecipeStep dto : recipe.getSteps()) {
                if (dto.getId() != null && existingById.containsKey(dto.getId())) {
                    RecipeStepEntity existing = existingById.get(dto.getId());
                    existing.setDescription(dto.getDescription());
                    existing.setStepNumber(dto.getStepNumber());
                } else {
                    RecipeStepEntity newEntity = recipeStepMapper.dtoToEntity(dto);
                    newEntity.setRecipe(existingRecipeEntity);
                    existingRecipeEntity.getSteps().add(newEntity);
                }
            }
        }
    }
}
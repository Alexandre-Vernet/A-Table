package com.a_table.service;

import com.a_table.dto.Recipe;
import com.a_table.exception.RecipeNotFoundException;
import com.a_table.model.RecipeEntity;
import com.a_table.model.RecipeStepEntity;
import com.a_table.repository.RecipeRepository;
import com.a_table.utils.MappingService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Base64;
import java.util.Comparator;
import java.util.List;

@Service
@Transactional
public class RecipeService {

    @Resource
    RecipeRepository recipeRepository;

    @Resource
    MappingService mappingService;


    public List<Recipe> getRecipes() {
        List<RecipeEntity> entities = recipeRepository.findAll();
        entities.forEach(r -> {
            if (r.getImage() != null && r.getImage().length > 0) {
                r.setImageBase64("data:image/jpeg;base64," + Base64.getEncoder().encodeToString(r.getImage()));
            }
        });
        return mappingService.convertListTo(entities, Recipe.class);
    }

    public Recipe getRecipe(Long id) {
        RecipeEntity recipe = recipeRepository.findById(id).orElseThrow(RecipeNotFoundException::new);
        if (recipe.getImage() != null && recipe.getImage().length > 0) {
            recipe.setImageBase64("data:image/jpeg;base64," + Base64.getEncoder().encodeToString(recipe.getImage()));
        }
        recipe.getSteps().sort(Comparator.comparingInt(RecipeStepEntity::getStepNumber));
        return mappingService.map(recipe, Recipe.class);
    }

    public Recipe createRecipe(Recipe recipe) {
        recipe.getIngredients().forEach(i -> i.setRecipe(recipe));
        recipe.getSteps().forEach(i -> i.setRecipe(recipe));

        RecipeEntity createdRecipe = recipeRepository.save(mappingService.map(recipe, RecipeEntity.class));
        return mappingService.map(createdRecipe, Recipe.class);
    }

    public Recipe updateRecipe(Long id, Recipe recipe) {
        RecipeEntity existingRecipe = recipeRepository.findById(id).orElseThrow(RecipeNotFoundException::new);
        mappingService.merge(recipe, existingRecipe);
        RecipeEntity updatedRecipe = recipeRepository.save(mappingService.map(existingRecipe, RecipeEntity.class));
        return mappingService.map(updatedRecipe, Recipe.class);
    }

    public void deleteRecipe(Long recipeId) {
        RecipeEntity recipeEntity = recipeRepository.findById(recipeId).orElseThrow(RecipeNotFoundException::new);
        recipeRepository.delete(recipeEntity);
    }

    public List<Recipe> getRecipesSearch(String search) {
        List<RecipeEntity> recipeEntityList = recipeRepository.findAllBySearch(search);
        return mappingService.convertListTo(recipeEntityList, Recipe.class);
    }
}

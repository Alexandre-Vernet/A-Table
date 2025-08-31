package com.a_table.service;

import com.a_table.dto.Recipe;
import com.a_table.exception.ErrorResponseException;
import com.a_table.model.RecipeEntity;
import com.a_table.repository.RecipeRepository;
import com.a_table.utils.Cast;
import jakarta.annotation.Resource;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecipeService {

    @Resource
    Cast cast;

    @Resource
    RecipeRepository recipeRepository;

    private final ModelMapper modelMapper;  // Injected directly (no need for Cast)


    public List<Recipe> getRecipes() {
        return cast.convertListTo(recipeRepository.findAll(), Recipe.class);
    }

    public Recipe createRecipe(Recipe recipe) {
        RecipeEntity createdRecipe = recipeRepository.save(cast.convertTo(recipe, RecipeEntity.class));
        return cast.convertTo(createdRecipe, Recipe.class);
    }

    public Recipe updateRecipe(Long id, Recipe recipe) {
        RecipeEntity existingRecipe = recipeRepository.findById(id).orElseThrow(() -> new ErrorResponseException("Recette non trouvée avec l'ID : " + id));
        modelMapper.map(recipe, existingRecipe);
        RecipeEntity updatedRecipe = recipeRepository.save(cast.convertTo(existingRecipe, RecipeEntity.class));
        return modelMapper.map(updatedRecipe, Recipe.class);
    }

    public void deleteRecipe(Long recipeId) {
        RecipeEntity recipeEntity = recipeRepository.findById(recipeId).orElseThrow(() -> new ErrorResponseException("Recette non trouvée avec l'ID : " + recipeId));
        recipeRepository.delete(recipeEntity);
    }
}

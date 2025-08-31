package com.a_table.service;

import com.a_table.dto.Recipe;
import com.a_table.model.RecipeEntity;
import com.a_table.repository.RecipeRepository;
import com.a_table.utils.Cast;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    @Resource
    Cast cast;

    @Resource
    RecipeRepository recipeRepository;


    public List<Recipe> getRecipes() {
        return cast.convertListTo(recipeRepository.findAll(), Recipe.class);
    }

    public Recipe createRecipe(Recipe recipe) {
        RecipeEntity createdRecipe = recipeRepository.save(cast.convertTo(recipe, RecipeEntity.class));
        return cast.convertTo(createdRecipe, Recipe.class);
    }
}

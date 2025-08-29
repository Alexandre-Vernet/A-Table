package com.a_table.service;

import com.a_table.dto.Recipe;
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
        return cast.castToDtoList(recipeRepository.findAll(), Recipe.class);
    }
}

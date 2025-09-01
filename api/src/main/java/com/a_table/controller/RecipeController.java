package com.a_table.controller;

import com.a_table.dto.Category;
import com.a_table.dto.Recipe;
import com.a_table.exception.InvalidCategoryException;
import com.a_table.service.RecipeService;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/recipe")
public class RecipeController {

    @Resource
    RecipeService recipeService;

    @GetMapping("/")
    List<Recipe> getExercises() {
        return recipeService.getRecipes();
    }

    @PostMapping("/")
    Recipe createRecipe(@Valid @RequestBody Recipe recipe) {
        boolean categoryValid = Category.categoryValid(recipe.getCategory());
        if (!categoryValid) {
            throw new InvalidCategoryException();
        }

        return recipeService.createRecipe(recipe);
    }

    @PutMapping("/{id}")
    Recipe updateRecipe(@PathVariable Long id, @Valid @RequestBody Recipe recipe) {
        return recipeService.updateRecipe(id, recipe);
    }

    @DeleteMapping("/{id}")
    void deleteRecipe(@PathVariable Long id) {
        recipeService.deleteRecipe(id);
    }
}

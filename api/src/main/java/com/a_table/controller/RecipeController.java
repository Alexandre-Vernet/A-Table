package com.a_table.controller;

import com.a_table.dto.Recipe;
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
    List<Recipe> getRecipes() {
        return recipeService.getRecipes();
    }

    @GetMapping("/search/{search}")
    List<Recipe> getRecipesSearch(@PathVariable String search) {
        return recipeService.getRecipesSearch(search);
    }

    @GetMapping("/{id}")
    Recipe getRecipe(@PathVariable Long id) {
        return recipeService.getRecipe(id);
    }

    @PostMapping("/")
    Recipe createRecipe(@Valid @RequestBody Recipe recipe) {
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

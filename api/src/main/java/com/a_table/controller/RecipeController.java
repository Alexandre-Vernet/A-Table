package com.a_table.controller;

import com.a_table.config.ErrorResponse;
import com.a_table.dto.Category;
import com.a_table.dto.Recipe;
import com.a_table.service.RecipeService;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
    ResponseEntity<?> createRecipe(@Valid @RequestBody Recipe recipe) {
        boolean categoryValid = Category.categoryValid(recipe.getCategory());
        if (!categoryValid) {
            ErrorResponse errorResponse = new ErrorResponse("Catégorie invalide");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        return ResponseEntity.ok(recipeService.createRecipe(recipe));
    }
}

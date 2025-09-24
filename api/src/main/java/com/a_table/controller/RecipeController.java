package com.a_table.controller;

import com.a_table.dto.Recipe;
import com.a_table.service.RecipeService;
import com.a_table.utils.PaginatedResponse;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/recipe")
public class RecipeController {

    @Resource
    RecipeService recipeService;

    @GetMapping("/")
    PaginatedResponse<Recipe> getRecipes(@RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "20") int size,
                                         @RequestParam(required = false) String category,
                                         @RequestParam(required = false) String search) {
        return recipeService.getRecipes(page, size, category, search);
    }

    @GetMapping("/user-recipes/{id}")
    PaginatedResponse<Recipe> getUserRecipes(@PathVariable Long id, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size) {
        return recipeService.getUserRecipes(id, page, size);
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

package com.a_table.controller;

import com.a_table.dto.Recipe;
import com.a_table.service.RecipeService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
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
}

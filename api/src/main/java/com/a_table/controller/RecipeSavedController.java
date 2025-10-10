package com.a_table.controller;

import com.a_table.dto.Recipe;
import com.a_table.service.RecipeSavedService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/recipe-saved")
public class RecipeSavedController {

    @Resource
    RecipeSavedService recipeSavedService;

    @PostMapping("/is-recipe-saved")
    public boolean getSavedRecipe(@RequestBody Recipe recipe) {
        return recipeSavedService.isRecipeSaved(recipe);
    }

    @PostMapping("/")
    void toggleRecipeUser(@RequestBody Recipe recipe) {
        recipeSavedService.toggleRecipe(recipe);
    }
}

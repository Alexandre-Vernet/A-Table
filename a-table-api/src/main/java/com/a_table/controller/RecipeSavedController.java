package com.a_table.controller;

import com.a_table.dto.Recipe;
import com.a_table.service.RecipeSavedService;
import com.a_table.utils.Paginate;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/recipe-saved")
public class RecipeSavedController {

    @Resource
    RecipeSavedService recipeSavedService;

    @GetMapping("/")
    public Paginate<Recipe> getSavedRecipes(@RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "20") int size,
                                            @RequestParam(required = false) String category,
                                            @RequestParam(required = false) String search
    ) {
        return recipeSavedService.getSavedRecipes(page, size, category, search);
    }

    @PostMapping("/is-recipe-saved")
    public boolean isRecipeSaved(@RequestBody Recipe recipe) {
        return recipeSavedService.isRecipeSaved(recipe);
    }

    @PostMapping("/")
    void toggleRecipeUser(@RequestBody Recipe recipe) {
        recipeSavedService.toggleRecipe(recipe);
    }
}

package com.a_table.service;

import com.a_table.dto.Category;
import com.a_table.dto.Recipe;
import com.a_table.dto.User;
import com.a_table.exception.InvalidCategoryException;
import com.a_table.exception.RecipeCantBeDeleted;
import com.a_table.exception.RecipeNotFoundException;
import com.a_table.model.RecipeEntity;
import com.a_table.model.RecipeStepEntity;
import com.a_table.model.UserEntity;
import com.a_table.repository.RecipeRepository;
import com.a_table.utils.MappingService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Base64;
import java.util.Comparator;
import java.util.List;

@Service
@Transactional
public class RecipeService {

    @Resource
    RecipeRepository recipeRepository;

    @Resource
    MappingService mappingService;

    @Resource
    UserService userService;


    public List<Recipe> getRecipes() {
        List<RecipeEntity> entities = recipeRepository.findAll();
        entities.forEach(recipe -> {
            UserEntity user = new UserEntity();
            user.setId(recipe.getUser().getId());
            recipe.setUser(user);
        });

        entities = this.getRecipeListImage(entities);

        return mappingService.convertListTo(entities, Recipe.class);
    }

    public Recipe getRecipe(Long id) {
        RecipeEntity recipeEntity = recipeRepository.findById(id).orElseThrow(RecipeNotFoundException::new);
        if (recipeEntity.getImage() != null && recipeEntity.getImage().length > 0) {
            recipeEntity.setImageBase64(getRecipeImage(recipeEntity));
        }
        recipeEntity.getSteps().sort(Comparator.comparingInt(RecipeStepEntity::getStepNumber));
        Recipe recipe = mappingService.map(recipeEntity, Recipe.class);
        return recipe.toBuilder()
                .user(User.builder()
                        .id(recipe.getUser().getId())
                        .firstName(recipe.getUser().getFirstName())
                        .lastName(recipe.getUser().getLastName())
                        .build())
                .build();
    }

    public Recipe createRecipe(Recipe recipe) {
        boolean categoryValid = Category.categoryValid(recipe.getCategory());
        if (!categoryValid) {
            throw new InvalidCategoryException();
        }

        User user = userService.getCurrentUser();

        if (recipe.getImage() != null && recipe.getImage().startsWith("data:image")) {
            String base64Image = recipe.getImage().split(",")[1];
            byte[] imageBytes = Base64.getDecoder().decode(base64Image);
            recipe.setImageBytes(imageBytes);
        }

        recipe.setUser(user);
        recipe.getIngredients().forEach(i -> i.setRecipe(recipe));
        recipe.getSteps().forEach(i -> i.setRecipe(recipe));

        RecipeEntity createdRecipe = recipeRepository.save(mappingService.map(recipe, RecipeEntity.class));
        return mappingService.map(createdRecipe, Recipe.class);
    }

    public Recipe updateRecipe(Long id, Recipe recipe) {
        RecipeEntity existingRecipe = recipeRepository.findById(id).orElseThrow(RecipeNotFoundException::new);
        mappingService.merge(recipe, existingRecipe);
        RecipeEntity updatedRecipe = recipeRepository.save(mappingService.map(existingRecipe, RecipeEntity.class));
        return mappingService.map(updatedRecipe, Recipe.class);
    }

    public void deleteRecipe(Long recipeId) {
        RecipeEntity recipeEntity = recipeRepository.findById(recipeId).orElseThrow(RecipeNotFoundException::new);
        User user = userService.getCurrentUser();
        if (!user.getId().equals(recipeEntity.getUser().getId())) {
            throw new RecipeCantBeDeleted();
        }

        recipeRepository.delete(recipeEntity);
    }

    public List<Recipe> getRecipesSearch(String search) {
        List<RecipeEntity> recipeEntityList = recipeRepository.findAllBySearch(search);
        recipeEntityList = this.getRecipeListImage(recipeEntityList);
        return mappingService.convertListTo(recipeEntityList, Recipe.class);
    }


    private String getRecipeImage(RecipeEntity recipe) {
        return "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(recipe.getImage());
    }

    private List<RecipeEntity> getRecipeListImage(List<RecipeEntity> recipe) {
        return recipe.stream().peek(r -> {
            if (r.getImage() != null && r.getImage().length > 0) {
                r.setImageBase64(getRecipeImage(r));
            }
        }).toList();
    }
}

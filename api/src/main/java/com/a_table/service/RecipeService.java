package com.a_table.service;

import com.a_table.config.mapper.RecipeMapper;
import com.a_table.config.mapper.UserMapper;
import com.a_table.dto.Category;
import com.a_table.dto.Recipe;
import com.a_table.dto.User;
import com.a_table.exception.InvalidCategoryException;
import com.a_table.exception.RecipeCantBeDeleted;
import com.a_table.exception.RecipeNotFoundException;
import com.a_table.exception.UserNotFoundException;
import com.a_table.model.RecipeEntity;
import com.a_table.model.RecipeStepEntity;
import com.a_table.repository.RecipeRepository;
import com.a_table.utils.PaginatedResponse;
import jakarta.annotation.Nullable;
import jakarta.annotation.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Base64;
import java.util.Comparator;

@Service
@Transactional
public class RecipeService {

    @Resource
    RecipeRepository recipeRepository;

    @Resource
    UserService userService;

    @Resource
    RecipeMapper recipeMapper;

    @Resource
    UserMapper userMapper;

    public PaginatedResponse<Recipe> getRecipes(int page, int size, @Nullable() String category, @Nullable String search) {
        Pageable pageable = PageRequest.of(page, size);

        Page<RecipeEntity> recipeEntityPage;
        if (category != null && search == null) {
            recipeEntityPage = recipeRepository.findAllByCategoryIgnoreCase(category, pageable);
        } else if (category == null && search != null) {
            recipeEntityPage = recipeRepository.findAllBySearchIgnoreAccent(search, pageable);
        } else if (category != null) {
            recipeEntityPage = recipeRepository.findAllBySearchAndCategoryIgnoreAccent(search, category, pageable);
        } else {
            recipeEntityPage = recipeRepository.findAll(pageable);
        }

        return new PaginatedResponse<>(
                recipeMapper.entityToDtoList(recipeEntityPage.getContent()),
                recipeEntityPage.getNumber(),
                recipeEntityPage.getSize(),
                recipeEntityPage.getTotalElements(),
                recipeEntityPage.getTotalPages(),
                recipeEntityPage.isLast()
        );
    }

    public PaginatedResponse<Recipe> getUserRecipes(Long id, int page, int size) {
        User user = userService.getUser(id);

        if (user == null) {
            throw new UserNotFoundException();
        }

        Pageable pageable = PageRequest.of(page, size);
        Page<RecipeEntity> recipeEntityPage = recipeRepository.findByUser(userMapper.dtoToEntity(user), pageable);

        return new PaginatedResponse<>(
                recipeMapper.entityToDtoList(recipeEntityPage.getContent()),
                recipeEntityPage.getNumber(),
                recipeEntityPage.getSize(),
                recipeEntityPage.getTotalElements(),
                recipeEntityPage.getTotalPages(),
                recipeEntityPage.isLast()
        );
    }

    public Recipe getRecipe(Long id) {
        RecipeEntity recipeEntity = recipeRepository.findById(id).orElseThrow(RecipeNotFoundException::new);
        recipeEntity.getSteps().sort(Comparator.comparingInt(RecipeStepEntity::getStepNumber));
        return recipeMapper.entityToDto(recipeEntity);
    }

    public Recipe createRecipe(Recipe recipe) {
        boolean categoryValid = Category.categoryValid(recipe.getCategory());
        if (!categoryValid) {
            throw new InvalidCategoryException();
        }

        recipe.setName(recipe.getName().trim());
        if (recipe.getNote() != null) {
            recipe.setNote(recipe.getNote().trim());
        }

        recipe.getSteps().forEach(step -> step.setDescription(step.getDescription().trim()));

        User user = userService.getCurrentUser();

        if (recipe.getImage() != null && recipe.getImage().startsWith("data:image")) {
            String base64Image = recipe.getImage().split(",")[1];
            byte[] imageBytes = Base64.getDecoder().decode(base64Image);
            recipe.setImageBytes(imageBytes);
        }

        recipe.setUser(user);
        recipe.getIngredients().forEach(i -> i.setRecipe(recipe));
        recipe.getSteps().forEach(i -> i.setRecipe(recipe));

        RecipeEntity createdRecipe = recipeRepository.save(recipeMapper.dtoToEntity(recipe));
        return recipeMapper.entityToDto(createdRecipe);
    }

    public Recipe updateRecipe(Long id, Recipe recipe) {
        RecipeEntity existingRecipe = recipeRepository.findById(id).orElseThrow(RecipeNotFoundException::new);
        recipeMapper.concat(recipe, existingRecipe);
        RecipeEntity updatedRecipe = recipeRepository.save(existingRecipe);
        return recipeMapper.entityToDto(updatedRecipe);
    }

    public void deleteRecipe(Long recipeId) {
        RecipeEntity recipeEntity = recipeRepository.findById(recipeId).orElseThrow(RecipeNotFoundException::new);
        User user = userService.getCurrentUser();
        if (!user.getId().equals(recipeEntity.getUser().getId())) {
            throw new RecipeCantBeDeleted();
        }

        recipeRepository.delete(recipeEntity);
    }
}

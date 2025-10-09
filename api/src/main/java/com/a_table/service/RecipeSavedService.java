package com.a_table.service;

import com.a_table.config.mapper.RecipeMapper;
import com.a_table.config.mapper.UserMapper;
import com.a_table.dto.Recipe;
import com.a_table.model.RecipeEntity;
import com.a_table.model.RecipeSavedEntity;
import com.a_table.model.UserEntity;
import com.a_table.repository.RecipeSavedRepository;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class RecipeSavedService {

    @Resource
    RecipeSavedRepository recipeSavedRepository;

    @Resource
    UserService userService;

    @Resource
    RecipeMapper recipeMapper;

    @Resource
    UserMapper userMapper;


    public boolean isRecipeSaved(Recipe recipe) {
        return getRecipeSavedEntity(recipe) != null;
    }

    public void toggleRecipe(Recipe recipe) {
        RecipeSavedEntity existing = getRecipeSavedEntity(recipe);
        if (existing != null) {
            recipeSavedRepository.delete(existing);
            return;
        }

        UserEntity userEntity = userMapper.dtoToEntity(userService.getCurrentUser());
        RecipeEntity recipeEntity = recipeMapper.dtoToEntity(recipe);

        RecipeSavedEntity recipeSavedEntity = new RecipeSavedEntity();
        recipeSavedEntity.setUser(userEntity);
        recipeSavedEntity.setRecipe(recipeEntity);
        recipeSavedRepository.save(recipeSavedEntity);
    }

    private RecipeSavedEntity getRecipeSavedEntity(Recipe recipe) {
        UserEntity userEntity = userMapper.dtoToEntity(userService.getCurrentUser());
        RecipeEntity recipeEntity = recipeMapper.dtoToEntity(recipe);
        return recipeSavedRepository.findByUserAndRecipe(userEntity, recipeEntity);
    }
}

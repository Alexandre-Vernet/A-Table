package com.a_table.service;

import com.a_table.config.mapper.RecipeMapper;
import com.a_table.config.mapper.UserMapper;
import com.a_table.dto.Recipe;
import com.a_table.model.RecipeEntity;
import com.a_table.model.RecipeSavedEntity;
import com.a_table.model.UserEntity;
import com.a_table.repository.RecipeSavedRepository;
import com.a_table.utils.Paginate;
import jakarta.annotation.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

    public Paginate<Recipe> getSavedRecipes(int page, int size) {
        UserEntity userEntity = userMapper.dtoToEntity(userService.getCurrentUser());
        Pageable pageable = PageRequest.of(page, size);

        Page<RecipeSavedEntity> recipeSavedEntityPage = recipeSavedRepository.findByUser(userEntity, pageable);
        List<Recipe> recipeList = recipeSavedEntityPage.stream()
                .map(RecipeSavedEntity::getRecipe)
                .map(recipeMapper::entityToDto)
                .toList();

        return new Paginate<>(
                recipeList,
                recipeSavedEntityPage.getNumber(),
                recipeSavedEntityPage.getSize(),
                recipeSavedEntityPage.getTotalElements(),
                recipeSavedEntityPage.getTotalPages(),
                recipeSavedEntityPage.isLast()
        );
    }

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

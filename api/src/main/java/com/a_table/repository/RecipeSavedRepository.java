package com.a_table.repository;

import com.a_table.model.RecipeEntity;
import com.a_table.model.RecipeSavedEntity;
import com.a_table.model.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeSavedRepository extends JpaRepository<RecipeSavedEntity, Long> {

    RecipeSavedEntity findByUserAndRecipe(UserEntity user, RecipeEntity recipe);

    Page<RecipeSavedEntity> findByUser(UserEntity user, Pageable pageable);
}

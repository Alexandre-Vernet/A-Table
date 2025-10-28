package com.a_table.repository;

import com.a_table.model.RecipeEntity;
import com.a_table.model.RecipeSavedEntity;
import com.a_table.model.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RecipeSavedRepository extends JpaRepository<RecipeSavedEntity, Long> {

    RecipeSavedEntity findByUserAndRecipe(UserEntity user, RecipeEntity recipe);

    @Query(value = """
            SELECT r FROM RecipeEntity r
                LEFT JOIN r.recipeSaved rs
                WHERE rs.user.id = :userId
                AND r.category = :category
            """)
    Page<RecipeEntity> findByUserAndCategory(@Param("userId") Long userId, @Param("category") String category, Pageable pageable);

    @Query(value = """
            SELECT r FROM RecipeEntity r
                LEFT JOIN r.recipeSaved rs
                WHERE rs.user.id = :userId
            """)
    Page<RecipeEntity> findByUser(@Param("userId") Long userId, Pageable pageable);

    @Query(value = """
            SELECT r.* FROM recipes r
                LEFT JOIN recipe_saved rs on rs.recipe_id = r.id
                WHERE rs.user_id = :userId
                AND unaccent(lower(r.name)) like unaccent(lower(concat('%', :search, '%')))
            """, nativeQuery = true)
    Page<RecipeEntity> findByUserAndSearch(@Param("userId") Long userId,
                                           @Param("search") String search,
                                           Pageable pageable);

    @Query(value = """
            SELECT r.* FROM recipes r
                LEFT JOIN recipe_saved rs on rs.recipe_id = r.id
                WHERE rs.user_id = :userId
                AND unaccent(lower(r.name)) like unaccent(lower(concat('%', :search, '%')))
                AND r.category = :category
            """, nativeQuery = true)
    Page<RecipeEntity> findAllBySearchAndCategoryIgnoreAccent(@Param("userId") Long userId,
                                                              @Param("search") String search,
                                                              @Param("category") String category,
                                                              Pageable pageable);
}

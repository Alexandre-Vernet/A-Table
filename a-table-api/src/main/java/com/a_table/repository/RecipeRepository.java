package com.a_table.repository;

import com.a_table.model.RecipeEntity;
import com.a_table.model.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RecipeRepository extends JpaRepository<RecipeEntity, Long> {

    @Query(value = """
                    SELECT r.* FROM recipes r
            WHERE unaccent(lower(r.name)) LIKE unaccent(lower(concat('%', :search, '%')))
            """, nativeQuery = true)
    Page<RecipeEntity> findAllBySearchIgnoreAccent(@Param("search") String search, Pageable pageable);

    @Query(value = """
                    SELECT r.* FROM recipes r
                    WHERE unaccent(lower(r.name)) LIKE unaccent(lower(concat('%', :search, '%')))
                    AND unaccent(lower(r.category)) LIKE unaccent(lower(concat('%', :category, '%')))
            """, nativeQuery = true)
    Page<RecipeEntity> findAllBySearchAndCategoryIgnoreAccent(@Param("search") String search, @Param("category") String category, Pageable pageable);

    Page<RecipeEntity> findByUser(UserEntity user, Pageable pageable);

    Page<RecipeEntity> findByUserAndCategory(UserEntity user, String category, Pageable pageable);

    Page<RecipeEntity> findAllByCategoryIgnoreCase(@Param("category") String category, Pageable pageable);

    @Modifying
    @Query("DELETE from RecipeEntity r where r.id = :id")
    void deleteById(@Param("id") Long id);
}

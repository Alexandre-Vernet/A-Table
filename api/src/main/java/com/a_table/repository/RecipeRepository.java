package com.a_table.repository;

import com.a_table.model.RecipeEntity;
import com.a_table.model.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecipeRepository extends JpaRepository<RecipeEntity, Long> {

    @Query(value = """
            SELECT r.* FROM recipes r
    WHERE unaccent(lower(r.name)) LIKE unaccent(lower(concat('%', :search, '%')))
    """, nativeQuery = true)
    List<RecipeEntity> findAllBySearchIgnoreAccent(@Param("search") String search);

    Page<RecipeEntity> findAllByUser(UserEntity user, Pageable pageable);
}

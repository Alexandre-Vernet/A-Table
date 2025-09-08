package com.a_table.repository;

import com.a_table.model.RecipeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecipeRepository extends JpaRepository<RecipeEntity, Long> {

    @Query("""
    select r from RecipeEntity r where lower(r.name) like '%' || lower(:search) || '%'
    """)
    List<RecipeEntity> findAllBySearch(@Param("search") String search);

}

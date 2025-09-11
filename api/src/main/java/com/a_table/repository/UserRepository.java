package com.a_table.repository;

import com.a_table.model.UserEntity;
import com.a_table.model.UserRecipeCountProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("SELECT u as user, count(r) as recipeCount from UserEntity u LEFT JOIN u.recipes r where u.id = :id group by u")
    Optional<UserRecipeCountProjection> findUserAndRecipeCountById(@Param("id") Long id);
}

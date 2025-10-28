package com.a_table.repository;

import com.a_table.model.IngredientEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<IngredientEntity, Long> {

}

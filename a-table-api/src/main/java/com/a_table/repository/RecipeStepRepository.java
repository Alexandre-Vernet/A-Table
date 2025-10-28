package com.a_table.repository;

import com.a_table.model.RecipeStepEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeStepRepository extends JpaRepository<RecipeStepEntity, Long> {

}

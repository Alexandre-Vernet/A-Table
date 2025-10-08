package com.a_table.repository;

import com.a_table.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query(value = """
                SELECT r.* FROM users r
                WHERE lower(r.last_name) LIKE lower(concat('%', :search, '%'))
                OR lower(r.first_name) LIKE lower(concat('%', :search, '%'))
                OR lower(r.email) LIKE lower(concat('%', :search, '%'))
                OR lower(concat(r.first_name, ' ', r.last_name)) LIKE lower(concat('%', :search, '%'))
                OR lower(concat(r.last_name, ' ', r.first_name)) LIKE lower(concat('%', :search, '%'))
            """, nativeQuery = true)
    List<UserEntity> findAllBySearchIgnoreAccent(@Param("search") String search);

}

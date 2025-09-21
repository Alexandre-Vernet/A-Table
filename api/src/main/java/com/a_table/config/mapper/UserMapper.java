package com.a_table.config.mapper;

import com.a_table.dto.User;
import com.a_table.model.UserEntity;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserMapper {

    @Resource
    RecipeMapper recipeMapper;

    public User entityToDto(UserEntity userEntity) {
        return User.builder()
                .id(userEntity.getId())
                .email(userEntity.getEmail())
                .lastName(userEntity.getLastName())
                .firstName(userEntity.getFirstName())
                .recipes(
                        userEntity.getRecipes().stream()
                                .map(recipe -> recipeMapper.entityToDto(recipe))
                                .toList()
                ).build();
    }

    public UserEntity dtoToEntity(User user) {
        return UserEntity.builder()
                .id(user.getId())
                .email(user.getEmail())
                .password(user.getPassword())
                .lastName(user.getLastName())
                .firstName(user.getFirstName())
                .build();
    }


    public List<User> entityToDtoList(List<UserEntity> userEntity) {
        return userEntity.stream().map(this::entityToDto).toList();
    }
}

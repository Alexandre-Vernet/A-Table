package com.a_table.config.mapper;

import com.a_table.dto.User;
import com.a_table.model.UserEntity;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User entityToDto(UserEntity userEntity) {
        return User.builder()
                .id(userEntity.getId())
                .email(userEntity.getEmail())
                .lastName(userEntity.getLastName())
                .firstName(userEntity.getFirstName())
                .build();
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
}

package com.a_table.service;

import com.a_table.config.mapper.UserMapper;
import com.a_table.dto.User;
import com.a_table.exception.RequireAuthException;
import com.a_table.exception.UserNotFoundException;
import com.a_table.model.UserEntity;
import com.a_table.repository.UserRepository;
import jakarta.annotation.Resource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserService {

    @Resource
    UserRepository userRepository;

    @Resource
    UserMapper userMapper;

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new SecurityException("Utilisateur non authentifié");
        }

        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .map(entity -> userMapper.entityToDto(entity))
                .map(user -> User.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .firstName(user.getFirstName())
                        .lastName(user.getLastName())
                        .build())
                .orElseThrow(RequireAuthException::new);
    }

    public User getUser(Long id) {
        Optional<UserEntity> userEntity = Optional.ofNullable(userRepository.findById(id).orElseThrow(UserNotFoundException::new));
        return userMapper.entityToDto(userEntity.get());
    }
}

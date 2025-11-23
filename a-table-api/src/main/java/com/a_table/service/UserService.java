package com.a_table.service;

import com.a_table.config.mapper.UserMapper;
import com.a_table.dto.User;
import com.a_table.exception.AccountDeactivateException;
import com.a_table.exception.UserNotFoundException;
import com.a_table.model.UserEntity;
import com.a_table.repository.UserRepository;
import jakarta.annotation.Resource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserService {

    @Resource
    UserRepository userRepository;

    @Resource
    UserMapper userMapper;

    @Resource
    BCryptPasswordEncoder passwordEncoder;


    private UserEntity getCurrentUserEntity() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal().equals("anonymousUser")) {
            throw new SecurityException("Utilisateur non authentifié");
        }

        UserEntity userEntity = (UserEntity) authentication.getPrincipal();
        if (!userEntity.getIsAccountActive()) {
            throw new AccountDeactivateException();
        }

        return userEntity;
    }

    public User getCurrentUser() {
        UserEntity userEntity = getCurrentUserEntity();

        return User.builder()
                .id(userEntity.getId())
                .email(userEntity.getEmail())
                .firstName(userEntity.getFirstName())
                .lastName(userEntity.getLastName())
                .isAccountActive(userEntity.getIsAccountActive())
                .build();
    }


    public User getUser(Long id) {
        UserEntity userEntity = userRepository.findById(id).orElseThrow(UserNotFoundException::new);
        return userMapper.entityToDto(userEntity);
    }

    public List<User> getRecipesSearch(String search) {
        List<UserEntity> userEntityList = userRepository.findAllBySearchIgnoreAccent(search);
        return userMapper.entityToDtoList(userEntityList);
    }

    public void deactivateAccount() {
        UserEntity userEntity = getCurrentUserEntity();
        userEntity.setIsAccountActive(false);
        userRepository.save(userEntity);
    }

    public void update(User user) {
        UserEntity currentUserEntity = getCurrentUserEntity();

        if (user.getFirstName() != null && !user.getFirstName().equals(currentUserEntity.getFirstName())) {
            currentUserEntity.setFirstName(user.getFirstName());
        }

        if (user.getLastName() != null && !user.getLastName().equals(currentUserEntity.getLastName())) {
            currentUserEntity.setLastName(user.getLastName());
        }

        if (user.getPassword() != null) {
            currentUserEntity.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        userRepository.save(currentUserEntity);
    }
}

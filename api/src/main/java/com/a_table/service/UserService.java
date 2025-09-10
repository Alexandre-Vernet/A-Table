package com.a_table.service;

import com.a_table.dto.User;
import com.a_table.model.UserEntity;
import com.a_table.repository.UserRepository;
import com.a_table.utils.MappingService;
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
    JwtService jwtService;

    @Resource
    MappingService mappingService;

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            if (authentication.getPrincipal() instanceof UserEntity userEntity) {
                return User.builder()
                        .id(userEntity.getId())
                        .email(userEntity.getEmail())
                        .firstName(userEntity.getFirstName())
                        .lastName(userEntity.getLastName())
                        .build();
            }
        }
        throw new RuntimeException("User not authenticated");
    }

    public User getCurrentUser(String token) {
        return jwtService.extractClaim(token, claims -> {
            String email = claims.getSubject();
            Optional<UserEntity> userEntity = userRepository.findByEmail(email);
            return userEntity.map(entity -> mappingService.map(entity, User.class)).orElse(null);
        });
    }
}

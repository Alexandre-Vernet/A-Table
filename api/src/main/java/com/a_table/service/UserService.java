package com.a_table.service;

import com.a_table.dto.AuthResponse;
import com.a_table.dto.LoginRequest;
import com.a_table.dto.User;
import com.a_table.exception.UserAlreadyExistException;
import com.a_table.model.UserEntity;
import com.a_table.repository.UserRepository;
import com.a_table.utils.MappingService;
import jakarta.annotation.Resource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {

    @Resource
    UserRepository userRepository;

    @Resource
    MappingService mappingService;

    @Resource
    BCryptPasswordEncoder passwordEncoder;

    @Resource
    AuthenticationManager authenticationManager;

    @Resource
    JwtService jwtService;


    public AuthResponse loginUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String jwtToken = jwtService.generateToken(userDetails);

        UserEntity user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        AuthResponse authResponse = AuthResponse.builder()
                .token(jwtToken)
                .userId(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .build();

        return authResponse;
    }

    public LoginRequest registerUser(User user) {
        boolean userExist = userRepository.existsByEmail(user.getEmail());
        if (userExist) {
            throw new UserAlreadyExistException();
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        UserEntity userEntity = mappingService.map(user, UserEntity.class);
        UserEntity userCreated = userRepository.save(userEntity);

        LoginRequest loginRequest = LoginRequest.builder()
                .email(userCreated.getEmail())
                .password(userCreated.getPassword())
                .build();

        return loginRequest;
    }
}

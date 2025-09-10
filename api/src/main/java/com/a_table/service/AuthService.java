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
public class AuthService {

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
        userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        String jwtToken = jwtService.generateToken(userDetails);

        return new AuthResponse(jwtToken);
    }

    public User registerUser(User user) {
        boolean userExist = userRepository.existsByEmail(user.getEmail());
        if (userExist) {
            throw new UserAlreadyExistException();
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        UserEntity userEntity = userRepository.save(mappingService.map(user, UserEntity.class));

        User userCreated = User.builder()
                .id(userEntity.getId())
                .email(userEntity.getEmail())
                .firstName(userEntity.getFirstName())
                .lastName(userEntity.getLastName())
                .build();

        return userCreated;
    }
}

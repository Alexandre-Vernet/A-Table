package com.a_table.service;

import com.a_table.config.mapper.UserMapper;
import com.a_table.dto.AuthResponse;
import com.a_table.dto.LoginRequest;
import com.a_table.dto.User;
import com.a_table.exception.UserAlreadyExistException;
import com.a_table.model.UserEntity;
import com.a_table.repository.UserRepository;
import jakarta.annotation.Resource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthService {

    @Resource
    UserRepository userRepository;

    @Resource
    BCryptPasswordEncoder passwordEncoder;

    @Resource
    AuthenticationManager authenticationManager;

    @Resource
    JwtService jwtService;

    @Resource
    UserMapper userMapper;


    public AuthResponse loginUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String jwtToken = jwtService.generateToken(userDetails);

        UserEntity userEntity = (UserEntity) authentication.getPrincipal();
        if (!userEntity.getStatus()) {
            userEntity.setStatus(true);
            userRepository.save(userEntity);
        }

        return new AuthResponse(jwtToken);
    }

    public User registerUser(User user) {
        boolean userExist = userRepository.existsByEmail(user.getEmail());
        if (userExist) {
            throw new UserAlreadyExistException();
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        UserEntity userEntity = userRepository.save(userMapper.dtoToEntity(user));

        return userMapper.entityToDto(userEntity);
    }
}

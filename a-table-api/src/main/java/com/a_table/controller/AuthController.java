package com.a_table.controller;

import com.a_table.dto.AuthResponse;
import com.a_table.dto.LoginRequest;
import com.a_table.dto.User;
import com.a_table.exception.JwtTokenExpiredException;
import com.a_table.service.AuthService;
import com.a_table.service.JwtService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Resource
    AuthService authService;

    @Resource
    JwtService jwtService;


    @PostMapping("/login")
    public AuthResponse authenticateUser(@RequestBody LoginRequest request) {
        return authService.loginUser(request);
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return authService.registerUser(user);
    }

    @PostMapping("/send-email-reset-password")
    Map<String, String> sendEmailForgotPassword(@RequestBody String email) {
        return authService.sendEmailForgotPassword(email);
    }

    @PostMapping("/verify-token")
    User verifyToken(@RequestBody String jwt) {
        boolean isTokenValid = jwtService.isTokenValid(jwt);
        if (!isTokenValid) {
            throw new JwtTokenExpiredException();
        }
        String email = jwtService.extractUsername(jwt);
        return authService.getUserByEmail(email);
    }

    @PatchMapping("/reset-password/{id}")
    void resetPassword(@PathVariable Long id, @RequestBody String password) {
        authService.updatePassword(id, password);
    }
}

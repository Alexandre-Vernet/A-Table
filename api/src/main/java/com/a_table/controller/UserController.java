package com.a_table.controller;

import com.a_table.dto.AuthResponse;
import com.a_table.dto.LoginRequest;
import com.a_table.dto.User;
import com.a_table.service.UserService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class UserController {

    @Resource
    UserService userService;

    @PostMapping("/login")
    public AuthResponse authenticateUser(@RequestBody LoginRequest request) {
        return userService.loginUser(request);
    }

    @PostMapping("/register")
    public LoginRequest registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }
}

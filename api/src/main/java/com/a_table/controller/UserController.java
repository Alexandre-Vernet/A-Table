package com.a_table.controller;

import com.a_table.dto.User;
import com.a_table.service.UserService;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

    @Resource
    UserService userService;

    @GetMapping("/me")
    User getCurrentUser(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        return userService.getCurrentUser(token);
    }
}

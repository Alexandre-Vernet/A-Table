package com.a_table.controller;

import com.a_table.dto.User;
import com.a_table.service.UserService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

    @Resource
    UserService userService;


    @GetMapping("/{id}")
    User getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }

    @GetMapping("/me")
    User getCurrentUser() {
        return userService.getCurrentUser();
    }
}

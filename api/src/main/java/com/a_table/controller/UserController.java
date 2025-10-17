package com.a_table.controller;

import com.a_table.dto.User;
import com.a_table.service.UserService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

    @GetMapping("/search")
    List<User> getUsersSearch(@RequestParam String search) {
        return userService.getRecipesSearch(search);
    }

    @PatchMapping("/")
    void update(@RequestBody User user) {
        userService.update(user);
    }

    @GetMapping("/deactivate")
    void deactivateAccount() {
        userService.deactivateAccount();
    }
}

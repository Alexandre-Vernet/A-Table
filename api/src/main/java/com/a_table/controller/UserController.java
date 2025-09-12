package com.a_table.controller;

import com.a_table.dto.ErrorResponse;
import com.a_table.dto.User;
import com.a_table.exception.UserNotFoundException;
import com.a_table.model.UserRecipeCount;
import com.a_table.service.UserService;
import jakarta.annotation.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    UserRecipeCount getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }

    @GetMapping("/me")
    ResponseEntity<?> getCurrentUser() {
        try {
            User user = userService.getCurrentUser();
            return ResponseEntity.ok(user);
        } catch (UserNotFoundException | SecurityException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Vous devez être connecté pour accéder à cette page", 401));
        }
    }
}

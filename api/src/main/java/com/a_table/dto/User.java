package com.a_table.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder()
@NoArgsConstructor
@AllArgsConstructor
public class User {
    Long id;
    String email;

    @JsonBackReference(value = "password")
    String password;

    String firstName;
    String lastName;

    @JsonBackReference(value = "recipes")
    List<Recipe> recipes = new ArrayList<>();
}

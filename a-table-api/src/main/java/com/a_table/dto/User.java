package com.a_table.dto;

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

    String password;

    String firstName;
    String lastName;

    List<Recipe> recipes = new ArrayList<>();

    Boolean status;
}

package com.a_table.model;

import com.a_table.dto.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRecipeCount {
    User user;
    Long recipeCount;
}

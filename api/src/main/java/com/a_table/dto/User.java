package com.a_table.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
    Long id;
    String email;
    String password;
    String firstName;
    String lastName;

}

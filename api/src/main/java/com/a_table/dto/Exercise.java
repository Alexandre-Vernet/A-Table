package com.a_table.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Exercise {
    private Long id;

    private String name;

    private String description;

    private Boolean isSmartWorkout;
}

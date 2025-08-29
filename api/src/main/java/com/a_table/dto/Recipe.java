package com.a_table.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Recipe {

    private Integer id;

    private String name;

    private Float nbPerson;

    private String category;

    private Short preparationTime;

    private Short cookingTime;
}

package com.a_table.dto;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class Recipe {

    private Long id;

    @NotNull(message = "Le nom est obligatoire")
    private String name;

    @NotNull(message = "Le nombre de personne est obligatoire")
    private Integer nbPerson;


    @NotNull(message = "La catégorie est obligatoire")
    private String category;


    @NotNull(message = "Le temps de préparation est obligatoire")
    @Positive(message = "Le temps de préparation doit être supérieur à 0")
    private Short preparationTime;


    @Positive(message = "Le temps de cuisson doit être supérieur à 0")
    private Short cookingTime;

    private String image;

    @Transient
    private byte[] imageBytes;


    private String note;

    @JsonManagedReference
    private List<Ingredient> ingredients = new ArrayList<>();

    @JsonManagedReference
    private List<RecipeStep> steps = new ArrayList<>();

    private User user;
}

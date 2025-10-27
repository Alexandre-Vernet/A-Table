package com.a_table.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class Recipe {

    private Long id;

    @NotNull(message = "Le nom est obligatoire")
    private String name;

    @NotNull(message = "Le nombre de personne est obligatoire")
    private Short nbPerson;


    @NotNull(message = "La catégorie est obligatoire")
    private String category;


    @Positive(message = "Le temps de préparation doit être supérieur à 0")
    private Short preparationTime;


    @Positive(message = "Le temps de cuisson doit être supérieur à 0")
    private Short cookingTime;

    private String image;

    private byte[] imageBytes;


    private String note;

    private List<Ingredient> ingredients = new ArrayList<>();

    private List<RecipeStep> steps = new ArrayList<>();

    private User user;
}

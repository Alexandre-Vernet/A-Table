import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../dto/Recipe';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from "@angular/common";
import { TimeConvertPipe } from "../../pipes/time-convert-pipe";
import { SearchRecipe } from "../search-recipe/search-recipe";
import { Button } from "primeng/button";

@Component({
    selector: 'app-list-recipes',
    templateUrl: './list-recipes.html',
    styleUrl: './list-recipes.scss',
    imports: [
        RouterLink,
        TitleCasePipe,
        TimeConvertPipe,
        SearchRecipe,
        Button
    ],
    standalone: true
})
export class ListRecipes implements OnInit {

    recipes: Recipe[] = [];
    filterRecipes: Recipe[] = [];

    constructor(
        private readonly recipeService: RecipeService
    ) {
    }

    ngOnInit() {
        this.recipeService.getRecipes()
            .subscribe({
                next: (recipes) => {
                    this.recipes = recipes;
                    this.filterRecipes = recipes;
                }
            })
    }

    searchRecipes(filterRecipes: Recipe[]) {
        this.filterRecipes = filterRecipes;
    }

    resetFilter() {
        this.filterRecipes = this.recipes;
    }
}

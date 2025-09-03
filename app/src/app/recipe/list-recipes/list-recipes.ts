import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../../dto/Recipe';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from "@angular/common";
import { TimeConvertPipe } from "../../pipes/time-convert-pipe";

@Component({
    selector: 'app-list-recipes',
    templateUrl: './list-recipes.html',
    styleUrl: './list-recipes.scss',
    imports: [
        RouterLink,
        TitleCasePipe,
        TimeConvertPipe
    ],
    standalone: true
})
export class ListRecipes implements OnInit {

    recipes: Recipe[] = [];

    constructor(
        private readonly recipeService: RecipeService
    ) {
    }

    ngOnInit() {
        this.recipeService.getRecipes()
            .subscribe({
                next: (recipes) => {
                    this.recipes = recipes;
                }
            })
    }

}

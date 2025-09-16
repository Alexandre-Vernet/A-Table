import { Component, HostListener, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../dto/Recipe';
import { RouterLink } from '@angular/router';
import { NgClass, TitleCasePipe } from "@angular/common";
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
        Button,
        NgClass
    ],
    standalone: true
})
export class ListRecipes implements OnInit {

    recipes: Recipe[] = [];
    filterRecipes: Recipe[] = [];

    showButtonAddRecipe = true;
    private lastScrollPosition: number;

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

    @HostListener('window:scroll', [])
    onWindowScroll() {
        const currentScrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

        // Scroll down and cross 100 px
        if (currentScrollPosition > this.lastScrollPosition && currentScrollPosition > 100) {
            this.showButtonAddRecipe = false;
        }
        // Scroll up
        else if (currentScrollPosition < this.lastScrollPosition) {
            this.showButtonAddRecipe = true;
        }

        this.lastScrollPosition = currentScrollPosition;
    }
}

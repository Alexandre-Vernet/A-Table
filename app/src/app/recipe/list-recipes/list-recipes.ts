import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../dto/Recipe';
import { RouterLink } from '@angular/router';
import { NgClass, TitleCasePipe } from "@angular/common";
import { TimeConvertPipe } from "../../pipes/time-convert-pipe";
import { SearchRecipe } from "../search-recipe/search-recipe";
import { Button } from "primeng/button";
import { Paginator, PaginatorState } from 'primeng/paginator';

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
        NgClass,
        Paginator
    ],
    standalone: true,
    encapsulation: ViewEncapsulation.None
})
export class ListRecipes implements OnInit {

    recipes: Recipe[] = [];
    filterRecipes: Recipe[] = [];

    pagination = {
        pageNumber: 0,
        pageSize: 10,
        totalElements: 0,
        totalPages: 0,
        last: false,
    }

    showButtonAddRecipe = true;
    private lastScrollPosition: number;

    constructor(
        private readonly recipeService: RecipeService
    ) {
    }

    ngOnInit() {
        this.getRecipes(0);
    }

    private getRecipes(page: number) {
        this.recipeService.getRecipes(page, this.pagination.pageSize)
            .subscribe({
                next: (response) => {
                    window.scroll(0, 0);
                    this.recipes = response.content;
                    this.filterRecipes = response.content;
                    this.pagination = { ...response };
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

    goToPage(event: PaginatorState) {
        this.pagination.pageSize = event.rows;
        if (event.page >= 0 && event.page < this.pagination.totalPages) {
            this.getRecipes(event.page);
            this.resetFilter();
        }
    }
}

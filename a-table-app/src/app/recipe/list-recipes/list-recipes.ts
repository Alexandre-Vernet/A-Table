import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../dto/Recipe';
import { RouterLink } from '@angular/router';
import { NgClass } from "@angular/common";
import { SearchRecipe } from "../search-recipe/search-recipe";
import { Button } from "primeng/button";
import { Paginate } from '../../dto/Paginate';
import { FilterRecipe } from '../filter-recipe/filter-recipe';
import { Subject } from 'rxjs';
import { Filter } from '../../dto/Filter';
import { RecipeGrid } from '../recipe-grid/recipe-grid';

@Component({
    selector: 'app-list-recipes',
    templateUrl: './list-recipes.html',
    styleUrl: './list-recipes.scss',
    imports: [
        RouterLink,
        SearchRecipe,
        Button,
        NgClass,
        FilterRecipe,
        RecipeGrid
    ],
    standalone: true,
    encapsulation: ViewEncapsulation.None
})
export class ListRecipes implements OnInit {

    filterCategory: string;
    search: string;

    recipes: Paginate<Recipe> = {
        content: [],
        pageNumber: 0,
        pageSize: 10,
        totalElements: 0,
        totalPages: 0,
        last: false,
    };
    searchUser$ = new Subject<void>;
    hideOverlay$ = new Subject<void>();

    showButtonAddRecipe = true;
    private lastScrollPosition: number;

    constructor(
        private readonly recipeService: RecipeService
    ) {
    }

    ngOnInit() {
        this.getRecipes();
    }

    private getRecipes(page?: number) {
        const filter: Filter = {
            page,
            size: this.recipes.pageSize,
            category: this.filterCategory,
            search: this.search
        };

        this.recipeService.getRecipes(filter)
            .subscribe({
                next: (paginateRecipe) => {
                    if (paginateRecipe.content.length === 0) {
                        this.searchUser$.next();
                    } else {
                        window.scroll(0, 0);
                        this.hideOverlay$.next();
                    }
                    this.recipes = paginateRecipe;
                }
            });
    }

    searchRecipes(search: string) {
        this.search = search;
        this.getRecipes();
    }


    filter(category: string) {
        this.filterCategory = category;
        this.getRecipes();
    }

    goToPage(page: number) {
        this.getRecipes(page);
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

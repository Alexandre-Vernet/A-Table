import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../dto/Recipe';
import { RouterLink } from '@angular/router';
import { NgClass, TitleCasePipe } from "@angular/common";
import { TimeConvertPipe } from "../../pipes/time-convert-pipe";
import { SearchRecipe } from "../search-recipe/search-recipe";
import { Button } from "primeng/button";
import { Paginator, PaginatorState } from 'primeng/paginator';
import { Paginate } from '../../dto/Paginate';
import { FilterRecipe } from '../filter-recipe/filter-recipe';
import { Subject } from 'rxjs';
import { TruncateRecipeNamePipe } from '../../pipes/truncate-recipe-name-pipe';
import { Filter } from '../../dto/Filter';

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
        Paginator,
        FilterRecipe,
        TruncateRecipeNamePipe
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
        pageSize: 20,
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
        this.recipes.pageSize = event.rows;
        if (event.page >= 0 && event.page < this.recipes.totalPages) {
            this.getRecipes(event.page);
        }
    }

    filter(category: string) {
        this.filterCategory = category;
        this.getRecipes();
    }
}

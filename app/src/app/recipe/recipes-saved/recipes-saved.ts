import { Component, OnInit } from '@angular/core';
import { RecipeSavedService } from '../../services/recipe-saved.service';
import { Recipe } from '../../dto/Recipe';
import { Paginate } from '../../dto/Paginate';
import { RouterLink } from '@angular/router';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { TruncateRecipeNamePipe } from '../../pipes/truncate-recipe-name-pipe';

@Component({
  selector: 'app-recipe-saved',
    imports: [
        RouterLink,
        Paginator,
        TruncateRecipeNamePipe
    ],
  templateUrl: './recipes-saved.html',
  styleUrl: './recipes-saved.scss'
})
export class RecipesSaved implements OnInit {

    recipes: Paginate<Recipe> = {
        content: [],
        pageNumber: 0,
        pageSize: 20,
        totalElements: 0,
        totalPages: 0,
        last: false,
    };

    constructor(
        private readonly recipeSaved: RecipeSavedService
    ) {
    }

    ngOnInit() {
        this.getSavedRecipes();
    }

    private getSavedRecipes(page?: number) {
        this.recipeSaved.getSavedRecipes(page, this.recipes.pageSize)
            .subscribe({
                next: (recipes) => this.recipes = recipes
            });
    }

    goToPage(event: PaginatorState) {
        this.recipes.pageSize = event.rows;
        if (event.page >= 0 && event.page < this.recipes.totalPages) {
            this.getSavedRecipes(event.page);
        }
    }
}

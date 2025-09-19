import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../dto/Recipe';
import { environment } from '../../environments/environment';
import { PaginatedResponse } from '../dto/PaginatedResponse';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {

    recipeUrl = environment.recipeUrl();

    constructor(
        private readonly http: HttpClient
    ) {
    }

    getRecipes(page: number = 0, size: number = 10, category?: string) {
        const params: {
            page: number,
            size: number,
            category?: string
        } = { page, size };

        if (category && category.trim() !== '') {
            params.category = category;
        }

        return this.http.get<PaginatedResponse<Recipe>>(`${ this.recipeUrl }/`, { params });
    }

    getRecipe(id: number) {
        return this.http.get<Recipe>(`${ this.recipeUrl }/${ id }`);
    }

    createRecipe(recipe: Recipe) {
        return this.http.post<Recipe>(`${ this.recipeUrl }/`, recipe);
    }

    searchRecipe(term: string) {
        return this.http.get<Recipe[]>(`${ this.recipeUrl }/search/${ term }`);
    }

    deleteRecipe(recipe: Recipe) {
        return this.http.delete<Recipe>(`${ this.recipeUrl }/${ recipe.id }`);
    }


    getRecipesUser(userId: number, page: number = 0, size: number = 10) {
        return this.http.get<PaginatedResponse<Recipe>>(`${ this.recipeUrl }/user-recipes/${ userId }`, {
            params: {
                page, size
            }
        });
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../dto/Recipe';
import { environment } from '../../environments/environment';
import { Paginate } from '../dto/Paginate';
import { Filter } from '../dto/Filter';
import { buildRecipeParams } from '../utils/buildRecipeParams';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {

    recipeUrl = environment.recipeUrl();

    constructor(
        private readonly http: HttpClient
    ) {
    }

    getRecipes(filter: Filter) {
        const params = buildRecipeParams(filter);
        return this.http.get<Paginate<Recipe>>(`${ this.recipeUrl }/`, { params });
    }

    getRecipe(id: number) {
        return this.http.get<Recipe>(`${ this.recipeUrl }/${ id }`);
    }

    createRecipe(recipe: Recipe) {
        return this.http.post<Recipe>(`${ this.recipeUrl }/`, recipe);
    }

    updateRecipe(recipe: Recipe) {
        return this.http.put<Recipe>(`${ this.recipeUrl }/${ recipe.id }`, recipe);
    }

    deleteRecipe(recipe: Recipe) {
        return this.http.delete<Recipe>(`${ this.recipeUrl }/${ recipe.id }`);
    }

    getRecipesUser(userId: number, page: number = 0, size: number = 10) {
        return this.http.get<Paginate<Recipe>>(`${ this.recipeUrl }/user-recipes/${ userId }`, {
            params: {
                page, size
            }
        });
    }
}

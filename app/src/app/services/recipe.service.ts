import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../dto/Recipe';
import { environment } from '../../environments/environment';
import { Paginate } from '../dto/Paginate';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {

    recipeUrl = environment.recipeUrl();

    constructor(
        private readonly http: HttpClient
    ) {
    }

    getRecipes(search?: string, category?: string, page?: number, size?: number) {
        const params: {
            page: number,
            size: number,
            category?: string
            search?: string
        } = {
            page: page ?? 0,
            size: size ?? 10
        };

        if (category && category.trim() !== '') {
            params.category = category;
        }

        if (search && search.trim() !== '') {
            params.search = search;
        }

        return this.http.get<Paginate<Recipe>>(`${ this.recipeUrl }/`, { params });
    }

    getRecipe(id: number) {
        return this.http.get<Recipe>(`${ this.recipeUrl }/${ id }`);
    }

    createRecipe(recipe: Recipe) {
        return this.http.post<Recipe>(`${ this.recipeUrl }/`, recipe);
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

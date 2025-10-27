import { Injectable } from '@angular/core';
import { Recipe } from '../dto/Recipe';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Filter } from '../dto/Filter';
import { Paginate } from '../dto/Paginate';
import { buildRecipeParams } from '../utils/buildRecipeParams';

@Injectable({
    providedIn: 'root'
})
export class RecipeSavedService {

    recipeSavedUrl = environment.recipeSavedUrl();

    constructor(
        private readonly http: HttpClient
    ) {
    }

    getSavedRecipes(filter: Filter) {
        const params = buildRecipeParams(filter);
        return this.http.get<Paginate<Recipe>>(`${ this.recipeSavedUrl }/`, { params });
    }

    isRecipeSaved(recipe: Recipe) {
        return this.http.post<boolean>(`${ this.recipeSavedUrl }/is-recipe-saved`, recipe);
    }

    toggleRecipeSaved(recipe: Recipe) {
        return this.http.post<void>(`${ this.recipeSavedUrl }/`, recipe);
    }
}

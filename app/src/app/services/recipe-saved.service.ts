import { Injectable } from '@angular/core';
import { Recipe } from '../dto/Recipe';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Paginate } from '../dto/Paginate';

@Injectable({
    providedIn: 'root'
})
export class RecipeSavedService {

    recipeSavedUrl = environment.recipeSavedUrl();

    constructor(
        private readonly http: HttpClient
    ) {
    }

    getSavedRecipes(page: number = 0, size: number = 20) {
        return this.http.get<Paginate<Recipe>>(`${ this.recipeSavedUrl }/`, {
            params: {
                page, size
            }
        });
    }

    isRecipeSaved(recipe: Recipe) {
        return this.http.post<boolean>(`${ this.recipeSavedUrl }/is-recipe-saved`, recipe);
    }

    toggleRecipeSaved(recipe: Recipe) {
        return this.http.post<void>(`${ this.recipeSavedUrl }/`, recipe);
    }
}

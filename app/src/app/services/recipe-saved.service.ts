import { Injectable } from '@angular/core';
import { Recipe } from '../dto/Recipe';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RecipeSavedService {

    recipeSavedUrl = environment.recipeSavedUrl();

    constructor(
        private readonly http: HttpClient
    ) {
    }

    isRecipeSaved(recipe: Recipe) {
        return this.http.post<boolean>(`${ this.recipeSavedUrl }/is-recipe-saved`, recipe);
    }

    toggleRecipeSaved(recipe: Recipe) {
        return this.http.post<void>(`${ this.recipeSavedUrl }/`, recipe);
    }
}

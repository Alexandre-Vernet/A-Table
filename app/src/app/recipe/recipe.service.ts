import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../dto/Recipe';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

    recipeUrl = environment.recipeUrl();

    constructor(
        private readonly http: HttpClient
    ) {
    }

    getRecipes() {
        return this.http.get<Recipe[]>(this.recipeUrl);
    }
}

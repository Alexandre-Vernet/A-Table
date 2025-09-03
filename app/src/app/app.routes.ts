import { Routes } from '@angular/router';
import { ListRecipes } from './recipe/list-recipes/list-recipes';
import { ViewRecipe } from './recipe/view-recipe/view-recipe';
import { CreateRecipe } from "./recipe/create-recipe/create-recipe";

export const routes: Routes = [
    {
        path: 'list-recipes',
        component: ListRecipes,
    },
    {
        path: 'view-recipe/:id',
        component: ViewRecipe,
    },
    {
        path: 'create-recipe',
        component: CreateRecipe,
    },
    {
        path: '**',
        redirectTo: 'list-recipes',
    }
];

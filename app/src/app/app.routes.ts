import { Routes } from '@angular/router';
import { ListRecipes } from './recipe/list-recipes/list-recipes';
import { ViewRecipe } from './recipe/view-recipe/view-recipe';

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
        path: '**',
        redirectTo: 'list-recipes',
    }
];

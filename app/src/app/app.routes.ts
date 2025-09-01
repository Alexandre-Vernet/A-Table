import { Routes } from '@angular/router';
import { ListRecipes } from './recipe/list-recipes/list-recipes';

export const routes: Routes = [
    {
        path: 'list-recipes',
        component: ListRecipes,
    },
    {
        path: '**',
        redirectTo: 'list-recipes',
    }
];

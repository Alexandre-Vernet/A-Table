import { Routes } from '@angular/router';
import { ListRecipes } from './recipe/list-recipes/list-recipes';
import { ViewRecipe } from './recipe/view-recipe/view-recipe';
import { CreateRecipe } from "./recipe/create-recipe/create-recipe";
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';

export const routes: Routes = [
    {
        path: 'recipe',
        children: [
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
            },
        ]
    },
    {
        path: 'auth',
        children: [
            {
                path: 'sign-in',
                component: SignInComponent
            },
            {
                path: 'sign-up',
                component: SignUpComponent
            },
            {
                path: 'reset-password',
                component: ResetPasswordComponent
            },
            {
                path: '**',
                redirectTo: 'sign-in'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'recipe',
        pathMatch: 'full'
    }
];

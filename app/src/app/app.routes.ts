import { Routes } from '@angular/router';
import { ListRecipes } from './recipe/list-recipes/list-recipes';
import { ViewRecipe } from './recipe/view-recipe/view-recipe';
import { CreateRecipe } from "./recipe/create-recipe/create-recipe";
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { authGuard } from './auth/auth.guard';
import { UserProfile } from './user/user-profile/user-profile';
import { SearchUser } from './user/search-user/search-user';

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
                canActivate: [authGuard]
            },
            {
                path: '**',
                redirectTo: 'list-recipes',
            },
        ]
    },
    {
        path: 'user',
        children: [
            {
                path: 'user-profile/:id',
                component: UserProfile
            },
        ]
    },
    {
        path: 'auth',
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'reset-password',
                component: ResetPasswordComponent
            },
            {
                path: '**',
                redirectTo: 'login'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'recipe',
        pathMatch: 'full'
    }
];

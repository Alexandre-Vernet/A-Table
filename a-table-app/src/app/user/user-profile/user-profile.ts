import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../dto/User';
import { AlertService } from '../../services/alert.service';
import { Paginate } from '../../dto/Paginate';
import { Recipe } from '../../dto/Recipe';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { RecipeService } from '../../services/recipe.service';
import { TruncateRecipeNamePipe } from '../../pipes/truncate-recipe-name-pipe';
import { tap } from 'rxjs';
import { TimeConvertPipe } from '../../pipes/time-convert-pipe';
import { TitleCasePipe } from '@angular/common';
import { FilterRecipe } from '../../recipe/filter-recipe/filter-recipe';
import { Filter } from '../../dto/Filter';

@Component({
    selector: 'app-user-profile',
    imports: [
        RouterLink,
        TruncateRecipeNamePipe,
        Paginator,
        TimeConvertPipe,
        TitleCasePipe,
        FilterRecipe
    ],
    templateUrl: './user-profile.html',
    styleUrl: './user-profile.scss',
    encapsulation: ViewEncapsulation.None
})
export class UserProfile implements OnInit {

    user: User;
    recipes: Paginate<Recipe> = {
        content: [],
        pageNumber: 0,
        pageSize: 20,
        totalElements: 0,
        totalPages: 0,
        last: false,
    };

    filterCategory: string;

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly userService: UserService,
        private readonly recipeService: RecipeService,
        private readonly alertService: AlertService
    ) {
    }

    ngOnInit() {
        const userId = this.route.snapshot.params['id'];
        this.userService.getUser(userId)
            .pipe(
                tap((user) => {
                    this.user = user;
                    this.getRecipesUser();
                })
            )
            .subscribe({
                error: (err => {
                    this.alertService.showError(err?.error?.message ?? 'Impossible d\'accéder à cette page');
                    this.router.navigate(['/']);
                })
            });
    }

    filter(category: string) {
        this.filterCategory = category;
        this.getRecipesUser();
    }

    goToPage(event: PaginatorState) {
        window.scroll(0, 0);
        this.recipes.pageSize = event.rows;
        const page = event.page;
        if (page >= 0 && page < this.recipes.totalPages) {
            this.getRecipesUser(page);
        }
    }


    private getRecipesUser(page: number = 0) {
        const filter: Filter = {
            page,
            size: this.recipes.pageSize,
            category: this.filterCategory,
        };
        this.recipeService.getRecipesUser(this.user.id, filter)
            .subscribe({
                next: (recipes) => {
                    this.recipes = recipes;
                }
            })
    }
}

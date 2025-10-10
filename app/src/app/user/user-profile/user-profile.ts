import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../dto/User';
import { AlertService } from '../../services/alert.service';
import { Paginate } from '../../dto/Paginate';
import { Recipe } from '../../dto/Recipe';
import { PaginatorState } from 'primeng/paginator';
import { RecipeService } from '../../services/recipe.service';
import { FilterRecipeCategoryPipe } from '../../pipes/filter-recipe-category-pipe';
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from 'primeng/accordion';
import { Categories } from '../../recipe/categories';

@Component({
    selector: 'app-user-profile',
    imports: [
        RouterLink,
        FilterRecipeCategoryPipe,
        AccordionHeader,
        AccordionContent,
        AccordionPanel,
        Accordion
    ],
    templateUrl: './user-profile.html',
    styleUrl: './user-profile.scss'
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

    protected readonly Categories = Categories;


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
            .subscribe({
                next: (user) => {
                    this.user = user;
                    this.getRecipesUser();
                },
                error: (err => {
                    this.alertService.showError(err?.error?.message ?? 'Impossible d\'accéder à cette page');
                    this.router.navigate(['/']);
                })
            });
    }

    private getRecipesUser(page: number = 0) {
        this.recipeService.getRecipesUser(this.user.id, page, this.recipes.pageSize)
            .subscribe({
                next: (recipes) => {
                    this.recipes = recipes;
                }
            })
    }


    goToPage(event: PaginatorState) {
        this.recipes.pageSize = event.rows;
        if (event.page >= 0 && event.page < this.recipes.totalPages) {
            this.getRecipesUser(event.page);
        }
    }
}

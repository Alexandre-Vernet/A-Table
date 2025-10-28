import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../dto/User';
import { AlertService } from '../../services/alert.service';
import { Paginate } from '../../dto/Paginate';
import { Recipe } from '../../dto/Recipe';
import { PaginatorState } from 'primeng/paginator';
import { RecipeService } from '../../services/recipe.service';
import { TruncateRecipeNamePipe } from '../../pipes/truncate-recipe-name-pipe';
import { tap } from 'rxjs';
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
        Accordion,
        TruncateRecipeNamePipe
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

    firstAvailablePanel: string;

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

    private getRecipesUser(page: number = 0) {
        this.recipeService.getRecipesUser(this.user.id, page, this.recipes.pageSize)
            .subscribe({
                next: (recipes) => {
                    this.recipes = recipes;
                    const panels = [
                        { key: '0', data: this.recipes.content.filter(r => r.category === Categories.entree) },
                        { key: '1', data: this.recipes.content.filter(r => r.category === Categories.plat) },
                        { key: '2', data: this.recipes.content.filter(r => r.category === Categories.dessert) },
                        { key: '3', data: this.recipes.content.filter(r => r.category === Categories.petitDejeuner) },
                        { key: '4', data: this.recipes.content.filter(r => r.category === Categories.autre) },
                    ];

                    const firstNonEmpty = panels.find(p => p.data.length > 0);
                    this.firstAvailablePanel = firstNonEmpty ? firstNonEmpty.key : null;
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

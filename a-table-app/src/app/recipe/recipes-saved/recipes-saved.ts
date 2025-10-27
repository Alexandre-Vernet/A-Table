import { Component, DestroyRef, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { RecipeSavedService } from '../../services/recipe-saved.service';
import { Recipe } from '../../dto/Recipe';
import { Paginate } from '../../dto/Paginate';
import { RouterLink } from '@angular/router';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { TruncateRecipeNamePipe } from '../../pipes/truncate-recipe-name-pipe';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FilterRecipe } from '../filter-recipe/filter-recipe';
import { Filter } from '../../dto/Filter';

@Component({
    selector: 'app-recipe-saved',
    imports: [
        RouterLink,
        Paginator,
        TruncateRecipeNamePipe,
        FloatLabel,
        InputText,
        FormsModule,
        ReactiveFormsModule,
        FilterRecipe
    ],
    templateUrl: './recipes-saved.html',
    styleUrl: './recipes-saved.scss',
    encapsulation: ViewEncapsulation.None
})
export class RecipesSaved implements OnInit {

    recipes: Paginate<Recipe> = {
        content: [],
        pageNumber: 0,
        pageSize: 20,
        totalElements: 0,
        totalPages: 0,
        last: false,
    };

    search = new FormControl('');
    filterCategory: string;

    destroyRef = inject(DestroyRef);

    constructor(
        private readonly recipeSaved: RecipeSavedService,
    ) {
    }

    ngOnInit() {
        this.getSavedRecipes();

        this.search.valueChanges
            .pipe(
                distinctUntilChanged(),
                debounceTime(300),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(() => this.getSavedRecipes())
    }

    goToPage(event: PaginatorState) {
        this.recipes.pageSize = event.rows;
        if (event.page >= 0 && event.page < this.recipes.totalPages) {
            this.getSavedRecipes(event.page);
        }
    }

    filter(category: string) {
        this.filterCategory = category;
        this.getSavedRecipes();
    }

    private getSavedRecipes(page?: number) {
        const filter: Filter = {
            page,
            size: this.recipes.pageSize,
            category: this.filterCategory,
            search: this.search.value.trim()
        };

        this.recipeSaved.getSavedRecipes(filter)
            .subscribe({
                next: (recipes) => this.recipes = recipes
            });
    }
}

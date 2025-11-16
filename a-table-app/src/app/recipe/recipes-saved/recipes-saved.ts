import { Component, DestroyRef, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { RecipeSavedService } from '../../services/recipe-saved.service';
import { Recipe } from '../../dto/Recipe';
import { Paginate } from '../../dto/Paginate';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FilterRecipe } from '../filter-recipe/filter-recipe';
import { Filter } from '../../dto/Filter';
import { RecipeGrid } from '../recipe-grid/recipe-grid';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'app-recipe-saved',
    imports: [
        FloatLabel,
        InputText,
        FormsModule,
        ReactiveFormsModule,
        FilterRecipe,
        RecipeGrid
    ],
    templateUrl: './recipes-saved.html',
    styleUrl: './recipes-saved.scss',
    encapsulation: ViewEncapsulation.None
})
export class RecipesSaved implements OnInit {

    recipes: Paginate<Recipe> = {
        content: [],
        pageNumber: 0,
        pageSize: 10,
        totalElements: 0,
        totalPages: 0,
        last: false,
    };

    search = new FormControl('');
    filterCategory: string;

    destroyRef = inject(DestroyRef);

    constructor(
        private readonly recipeSaved: RecipeSavedService,
        private alertService: AlertService
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

    private getSavedRecipes(page?: number) {
        const filter: Filter = {
            page,
            size: this.recipes.pageSize,
            category: this.filterCategory,
            search: this.search.value.trim()
        };

        this.recipeSaved.getSavedRecipes(filter)
            .subscribe({
                next: (recipes) => this.recipes = recipes,
                error: () => this.alertService.showError('Impossible de récupérer les recettes sauvegardées')
            });
    }

    goToPage(page: number) {
        this.getSavedRecipes(page);
    }

    filter(category: string) {
        this.filterCategory = category;
        this.getSavedRecipes();
    }
}

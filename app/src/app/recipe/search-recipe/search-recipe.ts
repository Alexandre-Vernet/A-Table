import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { RecipeService } from '../../services/recipe.service';
import { BehaviorSubject, delay, distinctUntilChanged, filter, map, Subject, switchMap } from 'rxjs';
import { Recipe } from '../../dto/Recipe';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-search-recipe',
    imports: [
        InputText,
        FloatLabel,
        FormsModule
    ],
    templateUrl: './search-recipe.html',
    styleUrl: './search-recipe.scss'
})
export class SearchRecipe implements OnInit {

    @Output() searchRecipes = new Subject<Recipe[]>();
    @Output() resetFilter = new Subject<void>();

    search = '';
    search$ = new BehaviorSubject<string>('');

    @ViewChild("inputSearch") inputSearch: ElementRef;

    constructor(
        private readonly recipeService: RecipeService
    ) {
    }

    ngOnInit() {
        this.search$
            .pipe(
                distinctUntilChanged(),
                delay(300),
                filter((search) => !!search),
                map(search => search.trim()),
                switchMap((search) => this.recipeService.searchRecipe(search))
            )
            .subscribe(recipes => this.searchRecipes.next(recipes));
    }

    onSearchChange() {
        this.search$.next(this.search);
    }

    clearSearch() {
        this.search = '';
        this.inputSearch.nativeElement.blur();
        this.resetFilter.next();
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { switchMap } from 'rxjs';
import { Recipe } from '../../dto/Recipe';
import { TitleCasePipe } from '@angular/common';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { TimeConvertPipe } from "../../pipes/time-convert-pipe";
import { AlertService } from "../../services/alert.service";

@Component({
    selector: 'app-view-recipe',
    imports: [
        TitleCasePipe,
        Tabs,
        TabList,
        Tab,
        TabPanels,
        TabPanel,
        TimeConvertPipe
    ],
    templateUrl: './view-recipe.html',
    styleUrl: './view-recipe.scss',
    standalone: true
})
export class ViewRecipe implements OnInit {

    recipe: Recipe;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly recipeService: RecipeService,
        private readonly alertService: AlertService
    ) {
    }

    ngOnInit() {
        this.route.params
            .pipe(switchMap((p: { id: number }) => this.recipeService.getRecipe(p.id)))
            .subscribe({
                next: (recipe => this.recipe = recipe),
                error: (err => this.alertService.alert$.next({
                    severity: 'error',
                    message: err?.error?.message ?? 'Impossible de supprimer cette recette'
                }))
            });
    }
}

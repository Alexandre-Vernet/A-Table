import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { switchMap } from 'rxjs';
import { Recipe } from '../../dto/Recipe';
import { TitleCasePipe } from '@angular/common';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { TimeConvertPipe } from "../../pipes/time-convert-pipe";
import { AlertService } from "../../services/alert.service";
import { Button } from "primeng/button";
import { ConfirmDialog } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { UserService } from '../../auth/user.service';
import { User } from '../../dto/User';

@Component({
    selector: 'app-view-recipe',
    imports: [
        TitleCasePipe,
        Tabs,
        TabList,
        Tab,
        TabPanels,
        TabPanel,
        TimeConvertPipe,
        Button,
        ConfirmDialog
    ],
    templateUrl: './view-recipe.html',
    styleUrl: './view-recipe.scss',
    standalone: true,
    providers: [ConfirmationService]
})
export class ViewRecipe implements OnInit {

    recipe: Recipe;

    user: User;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly recipeService: RecipeService,
        private readonly alertService: AlertService,
        private readonly confirmationService: ConfirmationService,
        private readonly userService: UserService
    ) {
    }

    ngOnInit() {
        this.route.params
            .pipe(switchMap((param: { id: number }) => this.recipeService.getRecipe(param.id)))
            .subscribe({
                next: (recipe => this.recipe = recipe),
                error: (err => {
                    this.alertService.alert$.next({
                        severity: 'error',
                        message: err?.error?.message ?? 'Impossible d\'accéder à cette recette'
                    });

                    this.router.navigate(['/']);
                })
            });

        this.userService.signInWithAccessToken()
            .subscribe(user => this.user = user)
    }

    showDialogDeleteRecipe(recipe: Recipe) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Voulez-vous vraiment supprimer cette recette ?',
            header: 'Supprimer la recette',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Cancel',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Delete',
                severity: 'danger',
            },

            accept: () => this.deleteRecipe(recipe),
        });
    }

    deleteRecipe(recipe: Recipe) {
        this.recipeService.deleteRecipe(recipe)
            .subscribe({
                next: () => {
                    this.router.navigate(['/']);

                    this.alertService.alert$.next({
                        severity: 'success',
                        message: 'Recette supprimée avec succès'
                    });
                },
                error: (err => this.alertService.alert$.next({
                    severity: 'error',
                    message: err?.error?.message ?? 'Impossible de supprimer cette recette'
                }))
            })
    }
}

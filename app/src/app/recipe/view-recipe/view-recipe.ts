import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../dto/Recipe';
import { TitleCasePipe } from '@angular/common';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { TimeConvertPipe } from "../../pipes/time-convert-pipe";
import { AlertService } from "../../services/alert.service";
import { Button } from "primeng/button";
import { ConfirmDialog } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { UserService } from '../../services/user.service';
import { User } from '../../dto/User';
import { RecipeSavedService } from '../../services/recipe-saved.service';
import { catchError, combineLatest, of, switchMap } from 'rxjs';

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
        ConfirmDialog,
        RouterLink
    ],
    templateUrl: './view-recipe.html',
    styleUrl: './view-recipe.scss',
    standalone: true,
    providers: [ConfirmationService]
})
export class ViewRecipe implements OnInit {

    recipe: Recipe;
    filterRecipe: Recipe;

    user: User;

    isRecipeSaved = false;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly recipeService: RecipeService,
        private readonly recipeSaved: RecipeSavedService,
        private readonly alertService: AlertService,
        private readonly confirmationService: ConfirmationService,
        private readonly userService: UserService
    ) {
    }

    ngOnInit() {
        const recipeId = this.route.snapshot.params['id'];

        combineLatest([
            this.recipeService.getRecipe(recipeId)
                .pipe(
                    switchMap(recipe => {
                        this.recipe = recipe;
                        this.filterRecipe = { ...recipe };
                        return this.recipeSaved.isRecipeSaved(recipe)
                            .pipe(catchError(() => of(null)));
                    })
                ),
            this.userService.user$
                .pipe(catchError(() => of(null)))
        ])
            .subscribe({
                next: ([isRecipeSaved, user]) => {
                    this.isRecipeSaved = isRecipeSaved;
                    this.user = user;
                },
                error: (err => {
                    this.alertService.showError(err?.error?.message ?? 'Impossible d\'accéder à cette recette');
                    this.router.navigate(['/']);
                })
            });
    }

    updateRecipe() {
        this.router.navigate(['recipe', 'update-recipe', this.recipe.id]);
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
                    this.alertService.showSuccess('Recette supprimée avec succès');
                },
                error: (err => this.alertService.showError(err?.error?.message ?? 'Impossible de supprimer cette recette'))
            })
    }

    decreaseNbPersons() {
        if (this.filterRecipe.nbPerson > 1) {
            this.filterRecipe.nbPerson--;
            this.updateRecipeNbPerson(this.filterRecipe.nbPerson);
        }
    }

    increaseNbPersons() {
        this.filterRecipe.nbPerson++;
        this.updateRecipeNbPerson(this.filterRecipe.nbPerson);
    }

    updateRecipeNbPerson(nbPersons: number) {
        if (nbPersons === this.recipe.nbPerson) {
            this.filterRecipe = { ...this.recipe };
            return;
        }

        this.filterRecipe = {
            ...this.recipe,
            nbPerson: nbPersons,
            ingredients: this.recipe.ingredients.map(ingredient => ({
                ...ingredient,
                quantity: Math.round((ingredient.quantity * nbPersons) / this.recipe.nbPerson)
            }))
        };
    }

    saveRecipe(recipe: Recipe) {
        this.recipeSaved.toggleRecipeSaved(recipe)
            .subscribe({
                next: () => {
                    this.isRecipeSaved = !this.isRecipeSaved;
                    if (this.isRecipeSaved) {
                        this.alertService.showSuccess('La recette a bien été ajoutée à vos favoris');
                    } else {
                        this.alertService.showSuccess('La recette a bien été supprimée de vos favoris');
                    }
                },
                error: () => {
                    if (this.isRecipeSaved) {
                        this.alertService.showError('Impossible de supprimer la recette de vos favoris');
                    } else {
                        this.alertService.showError('Impossible d\'ajouter la recette en favoris');
                    }
                }
            });
    }
}

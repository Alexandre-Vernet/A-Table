import { Component, OnInit } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { Textarea } from 'primeng/textarea';
import { InputNumber } from 'primeng/inputnumber';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';
import { RecipeService } from '../../services/recipe.service';
import { RecipeStep } from '../../dto/RecipeStep';
import { Message } from 'primeng/message';
import { Recipe } from '../../dto/Recipe';
import { AlertService } from '../../services/alert.service';
import { FileUpload, FileUploadEvent } from 'primeng/fileupload';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ingredientValidator } from '../../validators/ingredient.validator';
import { parseIngredient } from '../../utils/parseIngredient';
import { categories } from '../categories';

@Component({
    selector: 'app-create-recipe',
    imports: [
        InputText,
        ReactiveFormsModule,
        FloatLabel,
        Textarea,
        InputNumber,
        Select,
        Button,
        Message,
        FileUpload
    ],
    templateUrl: './create-recipe.html',
    styleUrl: './create-recipe.scss'
})
export class CreateRecipe implements OnInit {

    categories = categories.map(category => ({
        name: category
    }));

    placeholderSteps = "Battre les oeufs et le sucre dans un saladier\n" +
        "\n" +
        "Rajouter le beurre fondu et l'huile\n" +
        "\n" +
        "Mélanger la farine et la levure\n" +
        "Puis mélanger la moitié avec la préparation" +
        "\n" +
        "\n" +
        "Verser le lait progressivement tout en rajoutant l'autre moitié de la farine petit à petit";

    formCreateRecipe = new FormGroup({
        name: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
        nbPerson: new FormControl(4, [Validators.required, Validators.min(1), Validators.max(50)]),
        category: new FormControl(null, [Validators.required]),
        preparationTime: new FormControl(null, [Validators.min(1), Validators.max(999)]),
        cookingTime: new FormControl(null, [Validators.min(0), Validators.max(999)]),
        image: new FormControl(null),
        note: new FormControl(null, [Validators.minLength(5), Validators.maxLength(200)]),
        ingredients: new FormArray([]),
        steps: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.max(50)]),
    });

    updateRecipe: Recipe;

    loading: boolean = false;

    protected readonly environment = environment;

    get ingredientsControls() {
        return (this.formCreateRecipe.get('ingredients') as FormArray).controls;
    }

    constructor(
        private readonly recipeService: RecipeService,
        private readonly alertService: AlertService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        const recipeId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
        if (recipeId) {
            this.recipeService.getRecipe(recipeId)
                .subscribe({
                    next: (recipe) => {
                        this.updateRecipe = recipe;
                        this.formCreateRecipe.controls.ingredients.clear();

                        recipe.ingredients.forEach(ingredient => {
                            let ingredientFormated = `${ ingredient.name } ${ ingredient.quantity }`;
                            if (ingredient.unit) {
                                ingredientFormated += ' ' + ingredient.unit;
                            }
                            this.addIngredientLine(ingredientFormated);
                        });

                        this.formCreateRecipe.patchValue({
                            name: recipe.name,
                            category: {
                                name: recipe.category
                            },
                            nbPerson: recipe.nbPerson,
                            preparationTime: recipe.preparationTime,
                            cookingTime: recipe.cookingTime,
                            image: recipe.image,
                            note: recipe.note,
                            steps: recipe.steps.map(s => s.description).join("\n\n")
                        });
                    },
                    error: (err) => {
                        this.alertService.showError(err.error.message ?? 'Cette recette n\'existe pas');
                        this.router.navigate(['/']);
                    }
                });
        } else {
            this.formCreateRecipe.controls.category.setValue(this.categories[1]);
            this.addIngredientLine();
        }
    }

    onUpload(event: FileUploadEvent) {
        const file: File = event.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => this.formCreateRecipe.controls.image.setValue(reader.result as string);
            reader.readAsDataURL(file);
        }
    }

    submitCreateRecipe() {
        this.loading = true;

        const {
            name,
            category,
            nbPerson,
            preparationTime,
            cookingTime,
            image,
            note,
            ingredients,
            steps
        } = this.formCreateRecipe.getRawValue();

        const parsedIngredients = ingredients
            .filter(i => i.ingredient)
            .map(i => parseIngredient(i.ingredient));


        const recipeSteps: RecipeStep[] = [];

        const castedSteps: string[] = steps.trim()
            .split("\n\n")
            .filter((s: string) => s.trim() !== '');
        castedSteps.forEach((step, i) => {
            const recipeStep: RecipeStep = {
                stepNumber: i + 1,  // Start step to 1
                description: step
            };

            recipeSteps.push(recipeStep);
        });


        const recipe: Recipe = {
            id: this.updateRecipe && this.updateRecipe.id,
            name,
            category: category.name,
            nbPerson,
            preparationTime,
            cookingTime,
            image,
            note,
            ingredients: parsedIngredients,
            steps: recipeSteps
        };

        if (this.updateRecipe) {
            this.recipeService.updateRecipe(recipe)
                .subscribe({
                    next: (recipe) => {
                        this.alertService.showSuccess('Votre recette a bien été mise à jour');
                        // this.router.navigate(['/', 'recipe', 'view-recipe', recipe.id]);
                        this.loading = false;
                    },
                    error: (err) => {
                        this.alertService.showError(err?.error?.message ?? 'Erreur lors de la mise à jour de votre recette');
                        this.loading = false;
                    },
                });
        } else {
            this.recipeService.createRecipe(recipe)
                .subscribe({
                    next: (recipe) => {
                        this.alertService.showSuccess('Votre recette a bien été créée');
                        this.router.navigate(['/', 'recipe', 'view-recipe', recipe.id]);
                        this.loading = false;
                    },
                    error: (err) => {
                        this.alertService.showError(err?.error?.message ?? 'Erreur lors de la création de votre recette');
                        this.loading = false;
                    },
                });
        }
    }

    changeIngredients(index: number) {
        if (this.formCreateRecipe.controls.ingredients.at(index).valid && this.formCreateRecipe.controls.ingredients.value[index + 1] === undefined) {
            this.addIngredientLine();
        }
    }


    removeIngredient(index: number) {
        if (this.formCreateRecipe.controls.ingredients.length > 1) {
            this.ingredientsControls.splice(index, 1);
        }
    }


    private addIngredientLine(value?: string) {
        this.formCreateRecipe.controls.ingredients.push(
            new FormGroup({
                ingredient: new FormControl(value ?? null, ingredientValidator()),
            })
        );
    }
}

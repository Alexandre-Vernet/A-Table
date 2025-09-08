import { Component } from '@angular/core';
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
import { Ingredient } from '../../dto/Ingredient';
import { AlertService } from '../../services/alert.service';
import { FileUpload, FileUploadEvent } from "primeng/fileupload";

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
export class CreateRecipe {

    categories = [
        { name: 'Entrée', code: 'entrée' },
        { name: 'Plat', code: 'plat' },
        { name: 'Dessert', code: 'dessert' },
        { name: 'Petit déjeuner', code: 'petit déjeuner' },
        { name: 'Autre', code: 'autre' },
    ];

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
        name: new FormControl('qzdqzdqzd', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
        nbPerson: new FormControl(4, [Validators.required, Validators.min(1), Validators.max(50)]),
        category: new FormControl(<{ name: string, code: string }>this.categories[1], [Validators.required]),
        preparationTime: new FormControl(60, [Validators.required, Validators.min(1), Validators.max(999)]),
        cookingTime: new FormControl(60, [Validators.min(0), Validators.max(999)]),
        image: new FormControl(null),
        note: new FormControl(null, [Validators.minLength(5), Validators.maxLength(200)]),
        ingredients: new FormArray([
            this.createIngredientsFormGroup(),
        ]),
        steps: new FormControl('qzdqzdqzdqzdqzdzd', [Validators.required, Validators.minLength(5), Validators.max(50)]),
    });

    get ingredientsControls() {
        return (this.formCreateRecipe.get('ingredients') as FormArray).controls;
    }

    constructor(
        private readonly recipeService: RecipeService,
        private alertService: AlertService
    ) {
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

        const ingredientConvert: Ingredient[] = [];
        ingredients
            .filter(i => i.ingredient !== '' && i.quantity !== '')
            .forEach(i => {
                const newIngredient: Ingredient = {
                    ingredient: i.ingredient,
                    quantity: i.quantity
                };

                ingredientConvert.push(newIngredient);
            });

        const recipeSteps: RecipeStep[] = [];

        const castedSteps = steps.split("\n\n");
        castedSteps.forEach((step, i) => {
            const recipeStep: RecipeStep = {
                stepNumber: i + 1,  // Start step to 1
                description: step
            };

            recipeSteps.push(recipeStep);
        });


        const recipe: Recipe = {
            name,
            category: category.code,
            nbPerson,
            preparationTime,
            cookingTime,
            image,
            note,
            ingredients: ingredientConvert,
            steps: recipeSteps
        };

        this.recipeService.createRecipe(recipe)
            .subscribe({
                next: () => this.alertService.alert$.next({severity: 'success', message: 'Votre recette a bien été créée'}),
                error: (err) => this.alertService.alert$.next({severity: 'success', message:  err?.error?.message ?? 'Erreur lors de la création de votre recette'}),
            });
    }

    addIngredients(index: number) {
        if (this.formCreateRecipe.controls.ingredients.value[index + 1] === undefined) {
            this.addNewLine();
        }
    }


    removeIngredient(index: number) {
        if (this.formCreateRecipe.controls.ingredients.length > 1) {
            this.ingredientsControls.splice(index, 1);
        }
    }


    private addNewLine() {
        this.formCreateRecipe.controls.ingredients.push(this.createIngredientsFormGroup());
    }

    private createIngredientsFormGroup() {
        return new FormGroup({
            ingredient: new FormControl('qzdqzd'),
            quantity: new FormControl('qzdqzdzqd'),
        });
    }
}

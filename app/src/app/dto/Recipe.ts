import { Ingredient } from './Ingredient';
import { RecipeStep } from './RecipeStep';

export interface Recipe {
    id?: number;
    name: string;
    nbPerson: number;
    category: string;
    preparationTime: number;
    cookingTime: number;
    image?: string;
    note?: string;
    ingredients: Ingredient[];
    steps: RecipeStep[];
}

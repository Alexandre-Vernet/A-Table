import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../dto/Recipe';

@Pipe({
    name: 'filterRecipeCategory'
})
export class FilterRecipeCategoryPipe implements PipeTransform {

    transform(recipes: Recipe[], category: string) {
        return recipes.filter(r => r.category === category);
    }
}

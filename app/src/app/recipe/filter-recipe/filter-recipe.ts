import { Component, Output } from '@angular/core';
import { Select, SelectChangeEvent } from 'primeng/select';
import { BehaviorSubject } from 'rxjs';
import { categories } from '../categories';

@Component({
    selector: 'app-filter-recipe',
    imports: [
        Select
    ],
    templateUrl: './filter-recipe.html',
    styleUrl: './filter-recipe.scss'
})
export class FilterRecipe {

    @Output() category = new BehaviorSubject<string>('');

    categories= categories;

    filterCategory($event: SelectChangeEvent) {
        this.category.next($event.value.name);
    }
}

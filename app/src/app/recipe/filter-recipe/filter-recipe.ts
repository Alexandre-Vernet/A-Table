import { Component, Output } from '@angular/core';
import { Select, SelectChangeEvent } from 'primeng/select';
import { Subject } from 'rxjs';
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

    @Output() category = new Subject<string>();

    categories = categories;

    filterCategory($event: SelectChangeEvent) {
        if ($event?.value?.name) {
            this.category.next($event.value.name);
        }
    }

    resetFilter() {
        this.category.next(null);
    }
}

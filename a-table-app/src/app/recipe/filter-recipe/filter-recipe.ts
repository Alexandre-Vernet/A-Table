import { Component, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { categories } from '../categories';
import { Popover } from 'primeng/popover';
import { Button } from 'primeng/button';

@Component({
    selector: 'app-filter-recipe',
    imports: [
        Popover,
        Button
    ],
    templateUrl: './filter-recipe.html',
    styleUrl: './filter-recipe.scss'
})
export class FilterRecipe {

    @Output() category = new Subject<string>();

    categories = categories;

    filterCategory(value: string) {
        this.category.next(value);
    }

    resetFilter() {
        this.category.next(null);
    }
}

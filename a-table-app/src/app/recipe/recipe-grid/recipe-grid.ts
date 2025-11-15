import { Component, Input, Output } from '@angular/core';
import { Paginator, PaginatorState } from "primeng/paginator";
import { TimeConvertPipe } from "../../pipes/time-convert-pipe";
import { TitleCasePipe } from "@angular/common";
import { TruncateRecipeNamePipe } from "../../pipes/truncate-recipe-name-pipe";
import { Paginate } from '../../dto/Paginate';
import { Recipe } from '../../dto/Recipe';
import { RouterLink } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-recipe-grid',
    imports: [
        Paginator,
        TimeConvertPipe,
        TitleCasePipe,
        TruncateRecipeNamePipe,
        RouterLink
    ],
    templateUrl: './recipe-grid.html',
    styleUrl: './recipe-grid.scss',
})
export class RecipeGrid {

    @Input() recipes: Paginate<Recipe> = {
        content: [],
        pageNumber: 0,
        pageSize: 10,
        totalElements: 0,
        totalPages: 0,
        last: false,
    };

    @Input() showRecipeDetails: boolean = true;

    @Output() goToPage = new Subject<number>();

    onPageChange(event: PaginatorState) {
        window.scroll(0, 0);
        this.recipes.pageSize = event.rows;
        if (event.page >= 0 && event.page < this.recipes.totalPages) {
            this.goToPage.next(event.page);
        }
    }
}

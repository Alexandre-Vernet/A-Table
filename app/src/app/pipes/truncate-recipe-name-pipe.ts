import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncateRecipeName'
})
export class TruncateRecipeNamePipe implements PipeTransform {

    TRUNCATE_SIZE = 30;

    transform(value: string) {
        if (value.length > this.TRUNCATE_SIZE) {
            return `${ value.slice(0, this.TRUNCATE_SIZE) } ...`;
        }

        return value;
    }
}

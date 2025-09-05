import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeConvert'
})
export class TimeConvertPipe implements PipeTransform {

    transform(value: number): string {
        if (value < 0) return '0 mn';
        if (value >= 60) {
            const hours = Math.floor(value / 60);
            const minutes = value % 60;
            return minutes > 0 ? `${hours} h ${minutes} mn` : `${hours} h`;
        }
        return `${value} mn`;
    }


}

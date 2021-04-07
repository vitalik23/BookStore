import { Pipe, PipeTransform } from '@angular/core';
import { ConstShared } from '../constants/shared';


@Pipe({
    name: 'price'
})

export class PricePipe implements PipeTransform {
    transform(value: number, args?: any): string {
        return value.toFixed(ConstShared.COUNT_ELEMENT_AFTER_COMMA);
    }
}
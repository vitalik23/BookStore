import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from '../constants/constants';


@Pipe({
    name: 'price'
})

export class PricePipe implements PipeTransform {
    transform(value: number, args?: any): string {
        return value.toFixed(Constants.COUNT_ELEMENT_AFTER_COMMA);
    }
}
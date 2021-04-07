import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyLabel } from '../enums/currency-type.enum';



@Pipe({
    name: 'currency'
})

export class CurrencyPipe implements PipeTransform {
    transform(value: number, args?: any): any {
        return CurrencyLabel.get(value);
    }
}
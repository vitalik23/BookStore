import { Pipe, PipeTransform } from '@angular/core';
import { PrintingEditionLabel } from '../enums/printing-type.enum';



@Pipe({
    name: 'enum'
})

export class PrintingPipe implements PipeTransform {
    transform(value: number, args?: any): string {
       return PrintingEditionLabel.get(value);
    }
}
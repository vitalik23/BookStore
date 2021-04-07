import { Pipe, PipeTransform } from '@angular/core';
import { ConstShared } from '../constants/shared';


@Pipe({
    name: 'formatString'
})

export class StringPipe implements PipeTransform {
    transform(value: string, maxLength: number): any {

        if(value?.length > maxLength){
            let str = `${value.substring(ConstShared.START_VALUE, maxLength)} ...`;
            return str;
        }
        return value;   
      }
}
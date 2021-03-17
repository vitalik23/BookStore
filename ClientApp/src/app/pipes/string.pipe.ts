import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from '../constants/constants';


@Pipe({
    name: 'formatString'
})

export class StringPipe implements PipeTransform {
    transform(value: string, maxLength: number): any {

        if(value.length > maxLength){
            let str = `${value.substring(Constants.START_VALUE, maxLength)} ...`;
            return str;
        }
        return value;   
      }
}
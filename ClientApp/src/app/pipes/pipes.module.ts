import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintingPipe } from './printing.pipe';
import { StringPipe } from './string.pipe';
import { CurrencyPipe } from './currency.pipe';
import { PricePipe } from './price.pipe';
import { StatusPipe } from './status.pipe';



@NgModule({
  imports: [CommonModule],
  exports: [PrintingPipe, StringPipe, CurrencyPipe, PricePipe, StatusPipe],
  declarations: [PrintingPipe, StringPipe, CurrencyPipe, PricePipe, StatusPipe],
})
export class PipesModule { 
  static forRoot() {
    return {
        ngModule: PipesModule,
        providers: [],
    };
 }
}

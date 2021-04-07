import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintingEditionRoutingModule } from './printing-edition-routing.module';
import { PrintingEditionComponent } from './printing-edition.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { PrintingEditionDataComponent } from './printing-edition-data/printing-edition-data.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as reducers from './store/reducers/printing-edition.reducer';
import { GetMaxPricePrintingEditionEffect } from './store/effects/get-maxprice-printing-edition.effect';
import { GetPrintingEditionsEffect } from './store/effects/get-printing-editions.effect';
import { GetPrintingEditionEffect } from './store/effects/get-printing-edition.effect';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [PrintingEditionComponent, PrintingEditionDataComponent],
  imports: [
    CommonModule,
    PrintingEditionRoutingModule,
    MatGridListModule,
    StoreModule.forFeature(reducers.printingEditionReducer, reducers.printingEditionReducers),
    EffectsModule.forFeature([GetMaxPricePrintingEditionEffect, GetPrintingEditionEffect, GetPrintingEditionsEffect]),
    PipesModule.forRoot(),
    MatSidenavModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSliderModule,
    NgxPaginationModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ]
})
export class PrintingEditionModule { }

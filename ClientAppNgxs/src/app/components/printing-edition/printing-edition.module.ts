import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintingEditionRoutingModule } from './printing-edition-routing.module';
import { PrintingEditionComponent } from './printing-edition.component';
import { NgxsModule } from '@ngxs/store';
import { GetPrintingEditionsState } from './store/state/get-printing-editions.state';
import { PrintingEditionDataComponent } from './printing-edition-data/printing-edition-data.component';
import { GetPrintingEditionState } from './store/state/get-printing-edition.state';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { GetMaxPricePrintingEditionState } from './store/state/get-max-price.state';


@NgModule({
  declarations: [PrintingEditionComponent, PrintingEditionDataComponent],
  imports: [
    CommonModule,
    PrintingEditionRoutingModule,
    NgxsModule.forFeature([GetPrintingEditionsState, GetPrintingEditionState, GetMaxPricePrintingEditionState]),
    MatSidenavModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSliderModule,
    NgxPaginationModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatGridListModule,
    PipesModule.forRoot()

  ]
})
export class PrintingEditionModule { }

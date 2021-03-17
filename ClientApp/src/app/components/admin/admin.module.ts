import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ListClientComponent } from './list-client/list-client.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as reducers from './store/reducers/admin.reducer';
import { ClientListEffect } from './store/effects/list-client.effect';
import { DeleteEffect } from './store/effects/delete.effect';
import { BlockEffect } from './store/effects/block.effect';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { EditUserComponent } from './list-client/dialog/edit-user/edit-user.component';
import { UpdateEffect } from './store/effects/update.effect';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { DeletePrintingEditionEffect } from './store/effects/delete-printing-edition.effect';
import { UpdatePrintingEditionEffect } from './store/effects/update-printing-edition.effect';
import { UpdatePrintingEditionComponent } from './update-printing-edition/update-printing-edition.component';
import { ListAuthorsEffect } from './store/effects/list-authors.effect';
import { AddPrintingEditionComponent } from './add-printing-edition/add-printing-edition.component';
import { AddPrintingEditionEffect } from './store/effects/add-printing-edition.effect';
import { ListPrintingEditionComponent } from './list-printing-edition/list-printing-edition.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { GetPrintingEditionsEffect } from '../printing-edition/store/effects/get-printing-editions.effect';
import * as printingReducers from '../printing-edition/store/reducers/printing-edition.reducer'; 
import { GetPrintingEditionEffect } from '../printing-edition/store/effects/get-printing-edition.effect';

@NgModule({
  declarations: [ ListClientComponent, EditUserComponent, UpdatePrintingEditionComponent, AddPrintingEditionComponent, ListPrintingEditionComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    StoreModule.forFeature(reducers.adminReducer, reducers.adminReducers),
    StoreModule.forFeature(printingReducers.printingEditionReducer, printingReducers.printingEditionReducers),
    EffectsModule.forFeature([ClientListEffect, DeleteEffect, BlockEffect, 
                              UpdateEffect,
                              DeletePrintingEditionEffect, UpdatePrintingEditionEffect, ListAuthorsEffect,
                              AddPrintingEditionEffect, GetPrintingEditionsEffect, GetPrintingEditionEffect]),
    PipesModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatMenuModule,
    MatCheckboxModule,
    NgxPaginationModule
  ]
})
export class AdminModule { }

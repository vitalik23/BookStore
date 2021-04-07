import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ListPrintingEditionComponent } from './list-printing-edition/list-printing-edition.component';
import { NgxsModule } from '@ngxs/store';
import { GetPrintingEditionsState } from '../printing-edition/store/state/get-printing-editions.state';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { AddPrintingEditionComponent } from './add-printing-edition/add-printing-edition.component';
import { ListAuthorsState } from './store/state/list-authors.state';
import { UpdatePrintingEditionComponent } from './update-printing-edition/update-printing-edition.component';
import { GetPrintingEditionState } from '../printing-edition/store/state/get-printing-edition.state';
import { ListClientsComponent } from './list-clients/list-clients.component';
import { GetClientListState } from './store/state/list-client.state';
import { EditUserComponent } from './list-clients/edit-user/edit-user.component';

@NgModule({
  declarations: [ ListPrintingEditionComponent, AddPrintingEditionComponent, UpdatePrintingEditionComponent, ListClientsComponent, EditUserComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxsModule.forFeature([GetPrintingEditionsState, ListAuthorsState, 
                          GetPrintingEditionState, GetClientListState]),
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
  ],

})
export class AdminModule { }

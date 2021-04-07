import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from '../account/store/state/auth.state';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgxsModule.forFeature([AuthState]),
    MatDialogModule,
    MatMenuModule,
    MatBadgeModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    MatMenuModule,
    MatBadgeModule,
    
  ]
})
export class SharedModule { }

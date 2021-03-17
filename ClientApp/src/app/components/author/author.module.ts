import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorRoutingModule } from './author-routing.module';
import { CreateAuthorComponent } from './create-author/create-author.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as reducers from './store/reducers/author.reducer';
import { CreateAuthorEffect } from './store/effects/create-author.effect';
import { GetAuthorsComponent } from './get-authors/get-authors.component';
import { GetAuthorsEffect } from './store/effects/get-authors.effect';
import { UpdateAuthorComponent } from './update-author/update-author.component';
import { UpdateAuthorEffect } from './store/effects/update-author.effect';
import { DeleteAuthorEffect } from './store/effects/delete-author.effect';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [CreateAuthorComponent, GetAuthorsComponent, UpdateAuthorComponent],
  imports: [
    CommonModule,
    AuthorRoutingModule,
    StoreModule.forFeature(reducers.authorReducers, reducers.authorReducer),
    EffectsModule.forFeature([CreateAuthorEffect, GetAuthorsEffect, UpdateAuthorEffect, DeleteAuthorEffect]),
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    NgxPaginationModule
  ],
  exports: [],
  providers: [
    
  ]
})
export class AuthorModule { }

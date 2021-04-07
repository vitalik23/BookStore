import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { AuthorRoutingModule } from './author-routing.module';
import { GetAuthorsComponent } from './get-authors/get-authors.component';
import { CreateAuthorComponent } from './get-authors/create-author/create-author.component';
import { UpdateAuthorComponent } from './get-authors/update-author/update-author.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxsModule } from '@ngxs/store';
import { GetAuthorsState } from './store/state/get-authors.state';


@NgModule({
  declarations: [GetAuthorsComponent, CreateAuthorComponent, UpdateAuthorComponent],
  imports: [
    CommonModule,
    AuthorRoutingModule,
    NgxsModule.forFeature([GetAuthorsState]),
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatMenuModule,
    NgxPaginationModule
  ]
})
export class AuthorModule { }

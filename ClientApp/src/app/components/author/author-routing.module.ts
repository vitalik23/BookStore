import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/guard/auth-guard.service';
import { CreateAuthorComponent } from './create-author/create-author.component';
import { GetAuthorsComponent } from './get-authors/get-authors.component';
import { UpdateAuthorComponent } from './update-author/update-author.component';

const routes: Routes = [
  { path: 'create-author', component: CreateAuthorComponent, canActivate: [AuthGuardService] },
  { path: 'get-authors', component: GetAuthorsComponent, canActivate: [AuthGuardService] },
  { path: 'update-author/:id', component: UpdateAuthorComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/guard/auth-guard.service';
import { GetAuthorsComponent } from './get-authors/get-authors.component';

const routes: Routes = [
  { path: 'get-authors', component: GetAuthorsComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }

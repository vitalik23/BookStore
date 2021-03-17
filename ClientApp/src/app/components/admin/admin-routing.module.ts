import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/guard/auth-guard.service';
import { AddPrintingEditionComponent } from './add-printing-edition/add-printing-edition.component';
import { ListClientComponent } from './list-client/list-client.component';
import { ListPrintingEditionComponent } from './list-printing-edition/list-printing-edition.component';
import { UpdatePrintingEditionComponent } from './update-printing-edition/update-printing-edition.component';



const routes: Routes = [
  { path: 'list-client', component: ListClientComponent , canActivate: [AuthGuardService]},
  { path: 'update-printing-edition/:id', component: UpdatePrintingEditionComponent , canActivate: [AuthGuardService]},
  { path: 'add-printing-edition', component: AddPrintingEditionComponent , canActivate: [AuthGuardService]},
  { path: 'list-printing-edition', component: ListPrintingEditionComponent , canActivate: [AuthGuardService]},
];

@NgModule({   
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

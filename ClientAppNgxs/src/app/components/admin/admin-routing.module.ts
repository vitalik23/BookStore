import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/guard/auth-guard.service';
import { ListClientsComponent } from './list-clients/list-clients.component';
import { ListPrintingEditionComponent } from './list-printing-edition/list-printing-edition.component';

const routes: Routes = [
  { path: 'list-printing-edition', component: ListPrintingEditionComponent, canActivate: [AuthGuardService] },
  { path: 'list-client', component: ListClientsComponent,  canActivate: [AuthGuardService]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

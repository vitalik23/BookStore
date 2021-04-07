import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/guard/auth-guard.service';
import { ClientOrdersComponent } from './client-orders/client-orders.component';
import { GetOrdersComponent } from './get-orders/get-orders.component';

const routes: Routes = [
  { path: 'client-orders', component: ClientOrdersComponent , canActivate: [AuthGuardService]},
  { path: 'get-orders', component: GetOrdersComponent , canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/guard/auth-guard.service';
import { CartComponent } from './cart/cart.component';
import { ClientOrdersComponent } from './client-orders/client-orders.component';
import { GetOrdersComponent } from './get-orders/get-orders.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'client-orders', component: ClientOrdersComponent , canActivate: [AuthGuardService] },
  { path: 'pay', component: PaymentComponent ,  canActivate: [AuthGuardService] },
  { path: 'get-orders', component: GetOrdersComponent ,  canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }

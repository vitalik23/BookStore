import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { CartComponent } from './cart/cart.component';
import { ClientOrdersComponent } from './client-orders/client-orders.component';
import { GetOrdersComponent } from './get-orders/get-orders.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PaymentComponent } from './payment/payment.component';
import { NgxsModule } from '@ngxs/store';
import { GetClientOrdersState } from './store/state/get-client-orders.state';
import { GetOrdersState } from './store/state/get-orders.state';


@NgModule({
  declarations: [ CartComponent, ClientOrdersComponent, GetOrdersComponent, PaymentComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    NgxsModule.forFeature([GetClientOrdersState, GetOrdersState]),
    MatDialogModule,
    MatTableModule,
    PipesModule.forRoot(),
    FormsModule, 
    ReactiveFormsModule,
    NgxPaginationModule,
    MatMenuModule,
    MatCheckboxModule
  ]
})
export class OrderModule { }

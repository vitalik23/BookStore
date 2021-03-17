import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { CartComponent } from './cart/cart.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ClientOrdersComponent } from './client-orders/client-orders.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as reducers from './store/reducers/order.reducer'
import { GetOrdersClientEffect } from './store/effects/get-orders-client.effect';
import { CreateOrderEffect } from './store/effects/create-order.effect';
import { PaymentComponent } from './payment/payment.component';
import { CreatePayEffect } from './store/effects/create-pay.effect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { GetOrdersComponent } from './get-orders/get-orders.component';
import { GetOrdersEffect } from './store/effects/get-orders.effect';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [ CartComponent, ClientOrdersComponent, PaymentComponent, GetOrdersComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    StoreModule.forFeature(reducers.orderReducer, reducers.orderReducers),
    EffectsModule.forFeature([GetOrdersClientEffect, CreateOrderEffect, CreatePayEffect, GetOrdersEffect]),
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

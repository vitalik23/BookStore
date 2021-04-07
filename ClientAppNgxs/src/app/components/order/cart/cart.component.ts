import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { ConstShared } from 'src/app/constants/shared';
import { CartService } from 'src/app/services/cart.service';
import { OrderItemModel } from '../models/order-item.model';
import * as alertify from 'alertifyjs';
import { CreateOrder } from '../store/actions/get-client-orders.action';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products: OrderItemModel[];
  totalAmount: number = ConstShared.START_VALUE;


  constructor(
    private store$: Store,
    public dialogRef: MatDialogRef<CartComponent>,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.getItems();

    this.totalPrice();
  }

  totalPrice() {
    for (var i in this.products) {
      this.totalAmount += this.products[i].amount;
    }
  }

  getItems() {
    this.products = this.cartService.getItems();
  }

  deleteItems(element) {
    this.cartService.deleteProduct(element);
    this.getItems();
  }

  createOrder(product: OrderItemModel[]) {
    
    if(product == null || product.length < ConstShared.COUNT_ELEMENT_IN_ARRAY){
      return alertify.warning(ConstShared.EMPTY_ORDER);
    }

    this.store$.dispatch(new CreateOrder(product));

    this.cancel();
  }


  cancel() {
    this.dialogRef.close();
  }

}

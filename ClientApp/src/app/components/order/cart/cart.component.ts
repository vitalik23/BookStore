import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Constants } from 'src/app/constants/constants';
import { AppState } from 'src/app/store/state/app-state.state';
import { OrderItemModel } from '../models/order-item.model';
import { CartService } from '../../../service/cart.service';
import { CreateOrder } from '../store/actions/create-order.action';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private store$: Store<AppState>,
    public dialogRef: MatDialogRef<CartComponent>,
    private cartService: CartService,

  ) { }

  products: OrderItemModel[];
  totalAmount: number = Constants.START_VALUE;

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
    
    if(product == null || product.length < Constants.COUNT_ELEMENT_IN_ARRAY){
      return alert(Constants.EMPTY_ORDER);
    }

    this.store$.dispatch(new CreateOrder(product));

    this.cancel();
  }


  cancel() {
    this.dialogRef.close();
  }
}

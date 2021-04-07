import { Injectable } from '@angular/core';
import { OrderItemModel } from '../components/order/models/order-item.model';
import { ConstShared } from '../constants/shared';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = [];
  itemsToCart = [];

  constructor() { }

  addToCart(product, quantity: number) {

    var order: OrderItemModel = {
      id: ConstShared.START_VALUE,
      amount: product.price * quantity,
      count: quantity,
      printingEditionId: product.id,
      printingEdition: product,
      currency: product.currency
    }

    this.itemsToCart.push(order);

    localStorage.setItem(ConstShared.CART, JSON.stringify(this.itemsToCart));

  }

  getItems() {
    return JSON.parse(localStorage.getItem(ConstShared.CART));

  }

  deleteProduct(element: OrderItemModel) {
    this.cart = JSON.parse(localStorage.getItem(ConstShared.CART));
    let index = this.cart.findIndex(i => i.printingEditionId == element.printingEditionId);
    if (index != ConstShared.INDEX_ELEMENT) {
      this.cart.splice(index, ConstShared.COUNT_ELEMENT_DELETE);
    }
    localStorage.setItem(ConstShared.CART, JSON.stringify(this.cart));
  }

}

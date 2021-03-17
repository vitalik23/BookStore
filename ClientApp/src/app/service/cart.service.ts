import { Injectable } from '@angular/core';
import { OrderItemModel } from '../components/order/models/order-item.model';
import { Constants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = [];
  itemsToCart = [];

  constructor() { }

  addToCart(product, quantity: number) {

    var order: OrderItemModel = {
      id: Constants.ID_START_VALUE,
      amount: product.price * quantity,
      count: quantity,
      printingEditionId: product.id,
      printingEdition: product,
      currency: product.currency
    }

    this.itemsToCart.push(order);

    localStorage.setItem(Constants.CART, JSON.stringify(this.itemsToCart));

  }

  getItems() {
    return JSON.parse(localStorage.getItem(Constants.CART));

  }

  deleteProduct(element: OrderItemModel) {
    this.cart = JSON.parse(localStorage.getItem(Constants.CART));
    let index = this.cart.findIndex(i => i.printingEditionId == element.printingEditionId);
    if (index != Constants.INDEX_ELEMENT) {
      this.cart.splice(index, Constants.COUNT_ELEMENT_DELETE);
    }
    localStorage.setItem(Constants.CART, JSON.stringify(this.cart));
  }

}

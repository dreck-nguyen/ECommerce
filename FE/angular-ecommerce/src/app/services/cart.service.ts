import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {
    //check if we already have the item in our cart

    let alreadyExistsInCart: boolean = false;
    let existingInCartItem: any = undefined;

    if (this.cartItems.length > 0) {
      //find the item in the cart based on the item id

      // for (let tempCartItem of this.cartItems) {
      //   if (tempCartItem.id === theCartItem.id) {
      //     existingInCartItem = tempCartItem;
      //     break;
      //   }
      // }
      existingInCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);
      //check if we found
      alreadyExistsInCart = (existingInCartItem != undefined);

    }
    if (alreadyExistsInCart) {
      existingInCartItem.quantity++;
    } else {
      //just add the item to the []
      this.cartItems.push(theCartItem);
    }

    this.computeCartTotals();
  }
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data to tracking
    this.logCartData(totalPriceValue, totalQuantityValue);
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the the cart');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;

      console.log(`name: ${tempCartItem.name},
      quantity: ${tempCartItem.quantity},
      unitPrice=${tempCartItem.unitPrice},
      subTotalPrice=${subTotalPrice}`);

    }
    console.log(`totalPrice:${totalPriceValue.toFixed(2)}, totalQuantity:${totalQuantityValue}`);
    console.log('----------------------------------------------------------------------------');
  }
  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;

    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } else {
      this.computeCartTotals();
    }
  }
  remove(theCartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(tempCartItem => theCartItem.id === tempCartItem.id)

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotals();
    }
  }
}


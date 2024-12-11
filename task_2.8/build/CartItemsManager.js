"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class CartItemsManager extends BaseItemsManager {
    constructor() {
        super();
        this._cartItemsField = 'cartItems';
        (() => __awaiter(this, void 0, void 0, function* () {
            this.loadCartItems();
        }))();
    }
    /* Counting the total value of the each items in the cart */
    getTotalValue() {
        let totalValue = 0;
        this._items.forEach((item) => {
            totalValue += item.price;
        });
        return totalValue;
    }
    increaseItemCount(itemId) {
        const foundItem = this.findItem(itemId);
        if (foundItem != null)
            foundItem.count++;
    }
    decreaseItemCount(itemId) {
        const foundItem = this.findItem(itemId);
        if (foundItem != null)
            foundItem.count--;
    }
    /* Loading menu cart items from localStorage */
    loadCartItems() {
        if (localStorage.getItem(this._cartItemsField) != null) {
            this._items = JSON.parse(localStorage.getItem(this._cartItemsField));
        }
        else {
            this._items = [];
            this.saveCartItems();
        }
    }
    /* Saving menu cart items to localStorage */
    saveCartItems() {
        localStorage.setItem(this._cartItemsField, JSON.stringify(this._items));
    }
}

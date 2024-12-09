"use strict";
class CartItems {
    constructor() {
        this._cartItemsField = 'cartItems';
        this._cartItems = this.loadCartItems();
    }
    getCartItems() {
        return this._cartItems;
    }
    addCartItem(item, count) {
        this._cartItems.push(Object.assign(Object.assign({}, item), { count }));
        this.saveCartItems();
    }
    loadCartItems() {
        if (localStorage.getItem(this._cartItemsField) != null) {
            return JSON.parse(localStorage.getItem(this._cartItemsField));
        }
        else {
            return [];
        }
    }
    saveCartItems() {
        localStorage.setItem(this._cartItemsField, JSON.stringify(this._cartItems));
    }
}

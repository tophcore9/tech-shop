"use strict";
class CartItemsManager extends BaseItemsManager {
    constructor() {
        super();
        this._cartItemsField = 'cartItems';
        this.loadCartItems();
    }
    addItem(item) {
        this._items.push(Object.assign(Object.assign({}, item), { count: 1 }));
        this.saveCartItems();
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

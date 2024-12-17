"use strict";
class CartItemsManager extends BaseItemsManager {
    constructor() {
        super();
        this._cartItemsField = 'cartItems';
        this.loadCartItems();
    }
    /* Adding an item to the cart */
    addItem(item) {
        this._items.push(Object.assign(Object.assign({}, item), { count: 1 }));
        this.saveCartItems();
    }
    /* Removing an item from the cart */
    removeItem(itemId) {
        const res = super.removeItem(itemId);
        this.saveCartItems();
        return res;
    }
    /* Counting the total value of the each items in the cart */
    getTotalValue() {
        let totalValue = 0;
        this._items.forEach((item) => {
            totalValue += item.price * item.count;
        });
        return totalValue;
    }
    /* Incrementing a count of the exact item in the cart */
    increaseItemCount(itemId) {
        const foundItem = this.findItem(itemId);
        if (foundItem != null) {
            foundItem.count++;
            this.saveCartItems();
            return foundItem.count;
        }
        return 0;
    }
    /* Decrementing a count of the exact item in the cart */
    decreaseItemCount(itemId) {
        const foundItem = this.findItem(itemId);
        if (foundItem != null) {
            foundItem.count--;
            this.saveCartItems();
            return foundItem.count;
        }
        return 0;
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

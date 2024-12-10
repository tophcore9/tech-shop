"use strict";
class CartManager {
    constructor() {
        this._cartItemsField = 'cartItems';
        this._cartItems = [];
        this.loadCartItems();
    }
    /* Adding a new item to cart */
    addItemToCart(item) {
        this._cartItems.push(Object.assign(Object.assign({}, item), { count: 1 }));
    }
    /*
     * Removing the item from cart
     * If item deleted return true, otherwise false
     */
    removeItemFromCart(itemId) {
        for (let i = 0; i < this._cartItems.length; ++i) {
            if (this._cartItems[i].id === itemId) {
                this._cartItems.splice(i, 1);
                this.saveCartItems();
                return true;
            }
        }
        return false;
    }
    /* Getting all the items that are already in the cart */
    getAllCartItems() {
        return this._cartItems;
    }
    /* Looking for an item in the cart, if it's not found return null */
    findItem(itemId) {
        let foundItem = null;
        this._cartItems.forEach((item) => {
            if (item.id === itemId)
                foundItem = item;
        });
        return foundItem;
    }
    /* Counting the total value of the each items in the cart */
    getTotalValue() {
        let totalValue = 0;
        this._cartItems.forEach((item) => {
            totalValue += item.price;
        });
        return totalValue;
    }
    /* Increasing count of the exact item in the cart */
    increaseItemCount(itemId) {
        this._cartItems.forEach((item) => {
            if (item.id == itemId) {
                item.count++;
                return;
            }
        });
    }
    /* Decreasing count of the exact item in the cart */
    decreaseItemCount(itemId) {
        this._cartItems.forEach((item) => {
            if (item.id == itemId) {
                item.count--;
                return;
            }
        });
    }
    /* Loading menu cart items from localStorage */
    loadCartItems() {
        if (localStorage.getItem(this._cartItemsField) != null) {
            this._cartItems = JSON.parse(localStorage.getItem(this._cartItemsField));
        }
        else {
            this._cartItems = [];
            this.saveCartItems();
        }
    }
    /* Saving menu cart items to localStorage */
    saveCartItems() {
        localStorage.setItem(this._cartItemsField, JSON.stringify(this._cartItems));
    }
}

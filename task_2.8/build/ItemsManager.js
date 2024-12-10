"use strict";
class ItemsManager {
    constructor() {
        this._items = [];
        this.loadCartItems();
    }
    /* Adding a new item to the general list */
    addItem(item) {
        this._items.push(item);
    }
    /*
     * Removing the item from the general list
     * If item deleted return true, otherwise false
     */
    removeItem(itemId) {
        for (let i = 0; i < this._items.length; ++i) {
            if (this._items[i].id === itemId) {
                this._items.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    /* Getting all the items that are exist */
    getAllItems() {
        return this._items;
    }
    /* Filter each items by category and return them */
    getFilteredItemsByCategory(categoryName) {
        let filteredItems = [];
        this._items.forEach((item) => {
            if (item.category === categoryName)
                filteredItems.push(item);
        });
        return filteredItems;
    }
    /* Looking for an item in the cart, if it's not found return null */
    findItem(itemId) {
        this._items.forEach((item) => {
            if (item.id === itemId)
                return item;
        });
        return null;
    }
    /* Loading items from JSON file */
    loadCartItems() {
    }
}

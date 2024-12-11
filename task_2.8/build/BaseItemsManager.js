"use strict";
class BaseItemsManager {
    constructor(items = []) {
        this._items = [];
        this._items = items;
    }
    /* Getting all the items that are exist */
    get items() {
        return this._items;
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
    /* Looking for an item in the cart, if it's not found return null */
    findItem(itemId) {
        let foundItem = null;
        this._items.forEach((item) => {
            if (item.id === itemId)
                foundItem = item;
        });
        return foundItem;
    }
}

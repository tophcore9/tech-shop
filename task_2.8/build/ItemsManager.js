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
class ItemsManager {
    constructor() {
        this._items = [];
        this._itemsJsonUrl = '../items.json';
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
    get items() {
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
        let foundItem = null;
        this._items.forEach((item) => {
            if (item.id === itemId)
                foundItem = item;
        });
        return foundItem;
    }
    getMaxPrice() {
        let maxPrice = 0;
        this._items.forEach((item) => {
            if (item.price > maxPrice)
                maxPrice = item.price;
        });
        return maxPrice;
    }
    /* Loading items from JSON file */
    loadItemsFromJson() {
        return __awaiter(this, arguments, void 0, function* (JsonUrl = this._itemsJsonUrl) {
            try {
                const loadedItems = yield fetch(JsonUrl);
                if (!loadedItems.ok)
                    throw Error("Can't fetch items from " + this._itemsJsonUrl);
                this._items = yield loadedItems.json();
            }
            catch (errorMsg) {
                console.error(errorMsg);
            }
        });
    }
}

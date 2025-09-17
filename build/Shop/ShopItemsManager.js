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
class ShopItemsManager extends BaseItemsManager {
    constructor() {
        super();
        this._itemsJsonUrl = '../items.json';
    }
    /* Get the max price of the all items */
    getMaxPrice() {
        let maxPrice = 0;
        this._items.forEach((item) => {
            if (item.price > maxPrice)
                maxPrice = item.price;
        });
        return maxPrice;
    }
    /* Get the min price of the all items */
    getMinPrice() {
        let minPrice = this._items[0].price;
        for (let i = 1; i < this._items.length; ++i) {
            if (this._items[i].price < minPrice)
                minPrice = this._items[i].price;
        }
        return minPrice;
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

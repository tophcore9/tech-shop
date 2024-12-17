"use strict";
class Filtrator {
    // private _items: Item[];
    // constructor(items: Item[]) {
    //     this._items = items;
    // }
    static filterByCategory(items, categoryName) {
        let filteredItems = [];
        items.forEach((item) => {
            if (item.category == categoryName)
                filteredItems.push(item);
        });
        return filteredItems;
    }
    static filterByPrice(items, maxPrice) {
        let filteredItems = [];
        items.forEach((item) => {
            if (item.price <= maxPrice)
                filteredItems.push(item);
        });
        return filteredItems;
    }
    static filterByPriceInCategory(items, maxPrice, inCategory) {
        let filteredItems = [];
        items.forEach((item) => {
            if (item.category == inCategory && item.price <= maxPrice)
                filteredItems.push(item);
        });
        return filteredItems;
    }
    static filterByName(items, itemName) {
        let filteredItems = [];
        items.forEach((item) => {
            if (item.name.toLowerCase().includes(itemName.toLowerCase()))
                filteredItems.push(item);
        });
        return filteredItems;
    }
    static filterByNameInCategory(items, itemName, categoryName) {
        let filteredItems = [];
        items.forEach((item) => {
            if (item.name.toLowerCase().includes(itemName.toLowerCase()) && item.category == categoryName)
                filteredItems.push(item);
        });
        return filteredItems;
    }
}

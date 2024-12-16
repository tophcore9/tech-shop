"use strict";
class ShopFiltrator {
    constructor(items) {
        this._items = items;
    }
    filterByCategory(categoryName) {
        let filteredItems = [];
        this._items.forEach((item) => {
            if (item.category == categoryName)
                filteredItems.push(item);
        });
        return filteredItems;
    }
    filterByPriceAndCategory(maxPrice, inCategory) {
        let filteredItems = [];
        this._items.forEach((item) => {
            if (item.category == inCategory && item.price <= maxPrice)
                filteredItems.push(item);
        });
        return filteredItems;
    }
    filterByPrice(maxPrice) {
        let filteredItems = [];
        this._items.forEach((item) => {
            if (item.price <= maxPrice)
                filteredItems.push(item);
        });
        return filteredItems;
    }
}

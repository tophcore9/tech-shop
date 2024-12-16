class ShopFiltrator {
    private _items: Item[];

    constructor(items: Item[]) {
        this._items = items;
    }

    public filterByCategory(categoryName: string): Item[] {
        let filteredItems: Item[] = [];

        this._items.forEach((item) => {
            if (item.category == categoryName) filteredItems.push(item);
        });

        return filteredItems;
    }

    public filterByPriceAndCategory(maxPrice: number, inCategory: string): Item[] {
        let filteredItems: Item[] = [];

        this._items.forEach((item) => {
            if (item.category == inCategory && item.price <= maxPrice) filteredItems.push(item);
        });

        return filteredItems;
    }

    public filterByPrice(maxPrice: number): Item[] {
        let filteredItems: Item[] = [];

        this._items.forEach((item) => {
            if (item.price <= maxPrice) filteredItems.push(item);
        });

        return filteredItems;
    }

    public filterByNameAndCategory(itemName: string, categoryName: string): Item[] {
        let filteredItems: Item[] = [];

        this._items.forEach((item) => {
            if ((item.name).toLowerCase().includes(itemName.toLowerCase()) && item.category == categoryName) filteredItems.push(item);
        });

        return filteredItems;
    }

    public filterByName(itemName: string) {
        let filteredItems: Item[] = [];

        this._items.forEach((item) => {
            if ((item.name).toLowerCase().includes(itemName.toLowerCase())) filteredItems.push(item);
        });

        return filteredItems;
    }
}

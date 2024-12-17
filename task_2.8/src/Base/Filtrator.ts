class Filtrator {
    // private _items: Item[];

    // constructor(items: Item[]) {
    //     this._items = items;
    // }

    public static filterByCategory(items: Item[], categoryName: string): Item[] {
        let filteredItems: Item[] = [];

        items.forEach((item) => {
            if (item.category == categoryName) filteredItems.push(item);
        });

        return filteredItems;
    }

    public static filterByPrice(items: Item[], maxPrice: number): Item[] {
        let filteredItems: Item[] = [];

        items.forEach((item) => {
            if (item.price <= maxPrice) filteredItems.push(item);
        });

        return filteredItems;
    }

    public static filterByPriceInCategory(items: Item[], maxPrice: number, inCategory: string): Item[] {
        let filteredItems: Item[] = [];

        items.forEach((item) => {
            if (item.category == inCategory && item.price <= maxPrice) filteredItems.push(item);
        });

        return filteredItems;
    }

    public static filterByName(items: Item[], itemName: string) {
        let filteredItems: Item[] = [];

        items.forEach((item) => {
            if (item.name.toLowerCase().includes(itemName.toLowerCase())) filteredItems.push(item);
        });

        return filteredItems;
    }

    public static filterByNameInCategory(items: Item[], itemName: string, categoryName: string): Item[] {
        let filteredItems: Item[] = [];

        items.forEach((item) => {
            if (item.name.toLowerCase().includes(itemName.toLowerCase()) && item.category == categoryName)
                filteredItems.push(item);
        });

        return filteredItems;
    }
}
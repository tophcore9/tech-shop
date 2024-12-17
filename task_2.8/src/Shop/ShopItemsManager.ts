class ShopItemsManager extends BaseItemsManager<Item> {
    private _itemsJsonUrl: string;

    constructor() {
        super();
        this._itemsJsonUrl = '../items.json';
    }

    /* Get the max price of the all items */
    public getMaxPrice(): Number {
        let maxPrice = 0;

        this._items.forEach((item) => {
            if (item.price > maxPrice) maxPrice = item.price;
        });

        return maxPrice;
    }

    /* Get the min price of the all items */
    public getMinPrice(): Number {
        let minPrice = this._items[0].price;

        for (let i = 1; i < this._items.length; ++i) {
            if (this._items[i].price < minPrice) minPrice = this._items[i].price;
        }

        return minPrice;
    }

    /* Loading items from JSON file */
    public async loadItemsFromJson(JsonUrl: string = this._itemsJsonUrl) {
        try {
            const loadedItems = await fetch(JsonUrl);
            if (!loadedItems.ok) throw Error("Can't fetch items from " + this._itemsJsonUrl);

            this._items = await loadedItems.json();
        } catch (errorMsg) {
            console.error(errorMsg);
        }
    }
}

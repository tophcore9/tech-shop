class ShopItemsManager extends BaseItemsManager<Item> {
    private _itemsJsonUrl: string;

    constructor() {
        super();
        this._itemsJsonUrl = '../items.json';
    }

    /* Get the max price  */
    public getMaxPrice(): Number {
        let maxPrice = 0;

        this._items.forEach((item) => {
            if (item.price > maxPrice) maxPrice = item.price;
        });

        return maxPrice;
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

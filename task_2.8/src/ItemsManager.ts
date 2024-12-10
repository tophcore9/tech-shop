interface Item {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    ratingStars: number;
    category: string;
}

class ItemsManager {
    private _items: Item[];
    private _itemsJsonUrl: string;

    constructor() {
        this._items = [];
        this._itemsJsonUrl = '../items.json';
    }

    /* Adding a new item to the general list */
    public addItem(item: Item) {
        this._items.push(item);
    }

    /*
     * Removing the item from the general list
     * If item deleted return true, otherwise false
     */
    public removeItem(itemId: number): boolean {
        for (let i = 0; i < this._items.length; ++i) {
            if (this._items[i].id === itemId) {
                this._items.splice(i, 1);
                return true;
            }
        }

        return false;
    }

    /* Getting all the items that are exist */
    public getAllItems(): Item[] {
        return this._items;
    }

    /* Filter each items by category and return them */
    public getFilteredItemsByCategory(categoryName: string): Item[] {
        let filteredItems: Item[] = [];

        this._items.forEach((item) => {
            if (item.category === categoryName) filteredItems.push(item);
        });

        return filteredItems;
    }

    /* Looking for an item in the cart, if it's not found return null */
    public findItem(itemId: number): Item | null {
        let foundItem = null;

        this._items.forEach((item) => {
            if (item.id === itemId) foundItem = item;
        });

        return foundItem;
    }
    
    public getMaxPrice(): Number {
        let maxPrice = 0;

        this._items.forEach((item) => {
            if (item.price > maxPrice) maxPrice = item.price;
        })
        
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

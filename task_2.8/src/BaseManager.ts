interface Item {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    ratingStars: number;
    category: string;
}

abstract class BaseManager<TItem extends Item> {
    protected _items: TItem[] = [];

    constructor(items: TItem[] = []) {
        this._items = items;
    }

    /* Getting all the items that are exist */
    public get items(): TItem[] {
        return this._items;
    }

    /* Adding a new item to the general list */
    public addItem(item: TItem) {
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

    /* Looking for an item in the cart, if it's not found return null */
    public findItem(itemId: number): TItem | null {
        let foundItem = null;

        this._items.forEach((item) => {
            if (item.id === itemId) foundItem = item;
        });

        return foundItem;
    }
}

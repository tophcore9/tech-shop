interface CartItem extends Item {
    count: number;
}

class CartItemsManager extends BaseItemsManager<CartItem> {
    private _cartItemsField: string = 'cartItems';

    constructor() {
        super();
        this.loadCartItems();
    }

    /* Adding an item to the cart */
    public addItem(item: CartItem): void {
        this._items.push({ ...item, count: 1 });
        this.saveCartItems();
    }

    /* Removing an item from the cart */
    public removeItem(itemId: number): boolean {
        const res = super.removeItem(itemId);
        this.saveCartItems();
        return res;
    }

    /* Counting the total value of the each items in the cart */
    public getTotalValue(): number {
        let totalValue = 0;

        this._items.forEach((item) => {
            totalValue += item.price * item.count;
        });

        return totalValue;
    }

    /* Incrementing a count of the exact item in the cart */
    public increaseItemCount(itemId: number): number {
        const foundItem = this.findItem(itemId);

        if (foundItem != null) {
            foundItem.count++;
            this.saveCartItems();
            return foundItem.count;
        }

        return 0;
    }

    /* Decrementing a count of the exact item in the cart */
    public decreaseItemCount(itemId: number): number {
        const foundItem = this.findItem(itemId);

        if (foundItem != null) {
            if (foundItem.count > 1) {
                foundItem.count--;
            } else {
                this.removeItem(itemId);
            }

            this.saveCartItems();
            return foundItem.count;
        }

        return 0;
    }

    /* Loading menu cart items from localStorage */
    private loadCartItems() {
        if (localStorage.getItem(this._cartItemsField) != null) {
            this._items = JSON.parse(localStorage.getItem(this._cartItemsField) as string);
        } else {
            this._items = [];
            this.saveCartItems();
        }
    }

    /* Saving menu cart items to localStorage */
    private saveCartItems() {
        localStorage.setItem(this._cartItemsField, JSON.stringify(this._items));
    }
}

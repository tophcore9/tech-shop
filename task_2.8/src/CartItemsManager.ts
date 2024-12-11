interface CartItem extends Item {
    count: number;
}

class CartItemsManager extends BaseItemsManager<CartItem> {
    private _cartItemsField: string = 'cartItems';

    constructor() {
        super();
        (async () => {
            this.loadCartItems();
        })();
    }

    /* Counting the total value of the each items in the cart */
    public getTotalValue(): number {
        let totalValue = 0;

        this._items.forEach((item) => {
            totalValue += item.price;
        });

        return totalValue;
    }
    
    public increaseItemCount(itemId: number) {
        const foundItem = this.findItem(itemId);
        
        if (foundItem != null) foundItem.count++;
    }

    public decreaseItemCount(itemId: number) {
        const foundItem = this.findItem(itemId);
        
        if (foundItem != null) foundItem.count--
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

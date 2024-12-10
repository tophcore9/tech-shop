interface CartItem extends Item {
    count: number;
}

class CartManager {
    private _cartItems: CartItem[];
    private _cartItemsField: string = 'cartItems';

    constructor() {
        this._cartItems = [];
        this.loadCartItems();
    }

    /* Adding a new item to cart */
    public addItemToCart(item: Item) {
        this._cartItems.push({ ...item, count: 1 });
    }

    /*
     * Removing the item from cart
     * If item deleted return true, otherwise false
     */
    public removeItemFromCart(itemId: number): boolean {
        for (let i = 0; i < this._cartItems.length; ++i) {
            if (this._cartItems[i].id === itemId) {
                this._cartItems.splice(i, 1);
                this.saveCartItems();
                return true;
            }
        }

        return false;
    }

    /* Getting all the items that are already in the cart */
    public getAllCartItems(): CartItem[] {
        return this._cartItems;
    }

    /* Looking for an item in the cart, if it's not found return null */
    public findItem(itemId: number): CartItem | null {
        let foundItem = null;

        this._cartItems.forEach((item) => {
            if (item.id === itemId) foundItem = item;
        });

        return foundItem;
    }

    /* Counting the total value of the each items in the cart */
    public getTotalValue(): number {
        let totalValue = 0;

        this._cartItems.forEach((item) => {
            totalValue += item.price;
        });

        return totalValue;
    }

    /* Increasing count of the exact item in the cart */
    public increaseItemCount(itemId: number) {
        this._cartItems.forEach((item) => {
            if (item.id == itemId) {
                item.count++;
                return;
            }
        });
    }

    /* Decreasing count of the exact item in the cart */
    public decreaseItemCount(itemId: number) {
        this._cartItems.forEach((item) => {
            if (item.id == itemId) {
                item.count--;
                return;
            }
        });
    }

    /* Loading menu cart items from localStorage */
    private loadCartItems() {
        if (localStorage.getItem(this._cartItemsField) != null) {
            this._cartItems = JSON.parse(localStorage.getItem(this._cartItemsField) as string);
        } else {
            this._cartItems = [];
            this.saveCartItems();
        }
    }

    /* Saving menu cart items to localStorage */
    private saveCartItems() {
        localStorage.setItem(this._cartItemsField, JSON.stringify(this._cartItems));
    }
}

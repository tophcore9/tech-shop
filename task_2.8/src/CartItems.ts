interface CartItem extends Item {
    count: number;
}

class CartItems {
    private _cartItems: CartItem[];
    private _cartItemsField: string = 'cartItems';

    constructor() {
        this._cartItems = this.loadCartItems();
    }
    
    public getCartItems(): CartItem[] {
        return this._cartItems;
    }

    public addCartItem(item: Item, count: number) {
        this._cartItems.push({ ...item, count });
        this.saveCartItems();
    }

    private loadCartItems(): CartItem[] {
        if (localStorage.getItem(this._cartItemsField) != null) {
            return JSON.parse(localStorage.getItem(this._cartItemsField) as string);
        } else {
            return [];
        }
    }

    private saveCartItems() {
        localStorage.setItem(this._cartItemsField, JSON.stringify(this._cartItems));
    }
}

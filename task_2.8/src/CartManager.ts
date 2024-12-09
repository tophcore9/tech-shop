interface CartItem extends Item {
    count: number;
}

class CartManager {
    private _itemsManager: ItemsManager;
    // private _cartItems: CartItem[];

    private _navCart: HTMLButtonElement;
    private _asideCart: HTMLElement;
    private _closeCartButton: HTMLButtonElement;
    private _items: HTMLElement;
    private _totalPrice: HTMLElement;
    private _cartItemQuantity: HTMLElement;
    private _cartItemMinus: HTMLButtonElement;
    private _cartItemPlus: HTMLButtonElement;

    constructor(itemsManager: ItemsManager) {
        this._itemsManager = itemsManager;

        this._navCart = document.querySelector('.nav-cart') as HTMLButtonElement;
        this._asideCart = document.querySelector('.cart-menu') as HTMLElement;
        this._closeCartButton = document.querySelector('.cart-menu__close') as HTMLButtonElement;
        this._items = document.querySelector('.cart-menu__items') as HTMLElement;
        this._totalPrice = document.querySelector('.total-price') as HTMLElement;
        this._cartItemQuantity = document.querySelector('.cart-item__quantity') as HTMLElement;
        this._cartItemMinus = document.querySelector('.cart-item__minus') as HTMLButtonElement;
        this._cartItemPlus = document.querySelector('.cart-item__plus') as HTMLButtonElement;

        this._navCart.addEventListener('click', this.showCartMenu.bind(this));
        this._closeCartButton.addEventListener('click', this.hideCartMenu.bind(this));
    }

    private showCartMenu() {
        this._asideCart.classList.add('show-cart-menu');
    }

    private hideCartMenu() {
        this._asideCart.classList.remove('show-cart-menu');
    }

    public removeItems() {
        this._items.innerHTML = '';
    }

    public updateItems() {
        const items = this._itemsManager.getItems();
        let totalPrice = 0;

        this.removeItems();

        items.forEach((item) => {
            if (item.isInCart) {
                this._items.innerHTML += `
                    <div class="cart-menu__item" data-id="${item.id}">
                        <div class="cart-item__left">
                            <img class="cart-item__picture" src="${item.imageUrl}" alt="">
                            <div class="cart-item__info">
                                <div class="cart-item__name">${item.name}</div>
                                <div class="cart-item__price">$${item.price}</div>
                            </div>
                        </div>
                        <div class="cart-item__right">
                            <div class="cart-item__control">
                                <button class="cart-item__minus quantity-button">−</button>
                                <div class="cart-item__quantity">1</div>
                                <button class="cart-item__plus quantity-button">+</button>
                            </div>
                            <button class="cart-item__remove-button">Remove</button>
                        </div>
                    </div>
                `;
                totalPrice += item.price;
            }
        });

        this._totalPrice.innerHTML = '$' + totalPrice;
    }

    public increaseCount(itemId: number) {
        let currentCount = Number(this._cartItemQuantity.innerHTML) + 1;
        this._cartItemQuantity.innerHTML = currentCount.toString();
    }

    public decreaseCount(itemId: number) {
        let currentCount = Number(this._cartItemQuantity.innerHTML) - 1;
        this._cartItemQuantity.innerHTML = currentCount.toString();
    }
}

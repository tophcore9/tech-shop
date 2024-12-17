class CartItemsRenderer extends BaseItemsRenderer<CartItem, CartItemsManager> {
    private _totalPrice: HTMLElement;

    constructor(itemsWrapperClassName: string, cartManager: CartItemsManager) {
        super(itemsWrapperClassName, cartManager);

        this._totalPrice = document.querySelector('.total-price') as HTMLElement;
    }

    /* Rendering an exact item to the wrapper HTML class */
    public renderItem(item: CartItem): void {
        this._wrapperClass.innerHTML += `
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
                        <div class="cart-item__quantity">${item.count}</div>
                        <button class="cart-item__plus quantity-button">+</button>
                    </div>
                    <div>
                        <button class="cart-item__remove-button">Remove</button>
                    </div>
                </div>
            </div>
        `;
    }

    /* Overloading updateRender for updating totalValue too */
    public updateRender(): void {
        super.updateRender();
        this.updateTotalValue();
    }

    /* Updating total value by recalculating it */
    public updateTotalValue() {
        this._totalPrice.innerHTML = '$' + this.manager.getTotalValue();
    }
}

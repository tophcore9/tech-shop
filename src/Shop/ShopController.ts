class ShopController {
    private _shopItemsRenderer: ShopItemsRenderer;
    private _cartItemsRenderer: CartItemsRenderer;

    constructor(shopItemsRenderer: ShopItemsRenderer, cartItemsRenderer: CartItemsRenderer) {
        this._shopItemsRenderer = shopItemsRenderer;
        this._cartItemsRenderer = cartItemsRenderer;

        this.init();
    }

    private init() {
        new ShopFilters(this._shopItemsRenderer, this._cartItemsRenderer.manager.items);

        this._shopItemsRenderer.renderItems();
        this._shopItemsRenderer.setCheckboxes(this._cartItemsRenderer.manager.items);

        document.querySelector('.cart-menu__close')?.addEventListener('click', () => {
            this._shopItemsRenderer.setCheckboxes(this._cartItemsRenderer.manager.items);
        });

        this.syncCheckboxesHandler();
    }

    private syncCheckboxesHandler() {
        this._shopItemsRenderer.wrapperClass.addEventListener('click', (event) => {
            const target = event.target as HTMLInputElement;

            if (target.className == 'add-card__checkbox') {
                const currentItem = event.target as HTMLElement;
                const parentItem = currentItem.parentElement as HTMLElement;
                const currentItemId = Number(parentItem.dataset.id);
                const itemById = this._shopItemsRenderer.manager.findItem(currentItemId);

                if (target.checked) this._cartItemsRenderer.manager.addItem(itemById as CartItem);
                else this._cartItemsRenderer.manager.removeItem(currentItemId);

                this._cartItemsRenderer.updateRender();
            }
        });
    }
}

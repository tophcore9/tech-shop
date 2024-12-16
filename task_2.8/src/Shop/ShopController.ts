// ShopItemsManager
//                  \
//                    ShopItemsRenderer
//                                     \
//                                       ShopController <--
//                                     /
//                    CartItemsRenderer
//                  /                  \
// CartItemsManager                      CartMenuController

class ShopController {
    private _shopItemsRenderer: ShopItemsRenderer;
    private _cartItemsRenderer: CartItemsRenderer;

    constructor(shopItemsRenderer: ShopItemsRenderer, cartItemsRenderer: CartItemsRenderer) {
        this._shopItemsRenderer = shopItemsRenderer;
        this._cartItemsRenderer = cartItemsRenderer;

        this._shopItemsRenderer.renderItems();
        this.setCheckboxes();

        [...this._shopItemsRenderer.checkboxes].forEach((checkbox) => {
            checkbox.addEventListener('click', (event) => {
                const currentItem = event.target as HTMLElement;
                const parentItem = currentItem.parentElement as HTMLElement;
                const currentItemId = Number(parentItem.dataset.id);
                const itemById = this._shopItemsRenderer.manager.findItem(currentItemId);

                if (checkbox.checked) {
                    this._cartItemsRenderer.manager.addItem(itemById as CartItem);
                    this._cartItemsRenderer.updateRender();
                } else {
                    this._cartItemsRenderer.manager.removeItem(currentItemId);
                    this._cartItemsRenderer.updateRender();
                }
            });
        });
    }

    public setCheckboxes() {
        [...this._shopItemsRenderer.checkboxes].forEach((checkbox) => {
            const parent = checkbox.parentElement;
            const parentId = Number(parent?.dataset.id as string);

            if (this._cartItemsRenderer.manager.findItem(parentId)) checkbox.checked = true;
        });
    }
}

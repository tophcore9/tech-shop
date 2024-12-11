"use strict";
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
    constructor(shopItemsRenderer, cartItemsRenderer) {
        this._shopItemsRenderer = shopItemsRenderer;
        this._cartItemsRenderer = cartItemsRenderer;
        this._shopItemsRenderer.renderItems();
        [...this._shopItemsRenderer.checkboxes].forEach((checkbox) => {
            checkbox.addEventListener('click', (event) => {
                const currentItem = event.target;
                const parentItem = currentItem.parentElement;
                const currentItemId = Number(parentItem.dataset.id);
                const itemById = this._shopItemsRenderer.manager.findItem(currentItemId);
                if (checkbox.checked) {
                    this._cartItemsRenderer.manager.addItem(itemById);
                    this._cartItemsRenderer.updateRender();
                }
                else {
                    this._cartItemsRenderer.manager.removeItem(currentItemId);
                    this._cartItemsRenderer.updateRender();
                }
            });
        });
    }
}

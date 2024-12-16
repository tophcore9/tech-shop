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
        this.setCheckboxes();
        [...this._shopItemsRenderer.checkboxes].forEach((checkbox) => {
            checkbox.addEventListener('click', (event) => {
                const currentItem = event.target;
                const parentItem = currentItem.parentElement;
                const currentItemId = Number(parentItem.dataset.id);
                const itemById = this._shopItemsRenderer.manager.findItem(currentItemId);
                if (checkbox.checked) {
                    this._cartItemsRenderer.manager.addItem(itemById);
                }
                else {
                    this._cartItemsRenderer.manager.removeItem(currentItemId);
                }
                this._cartItemsRenderer.updateRender();
            });
        });
    }
    setCheckboxes() {
        [...this._shopItemsRenderer.checkboxes].forEach((checkbox) => {
            const parent = checkbox.parentElement;
            const parentId = Number(parent === null || parent === void 0 ? void 0 : parent.dataset.id);
            if (this._cartItemsRenderer.manager.findItem(parentId))
                checkbox.checked = true;
            else
                checkbox.checked = false;
        });
    }
}

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
        var _a;
        this._shopItemsRenderer = shopItemsRenderer;
        this._cartItemsRenderer = cartItemsRenderer;
        this._shopFiltrator = new ShopFilters(this._shopItemsRenderer, this._cartItemsRenderer.manager.items);
        this._shopItemsRenderer.renderItems();
        this._shopItemsRenderer.setCheckboxes(this._cartItemsRenderer.manager.items);
        (_a = document.querySelector('.cart-menu__close')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            this._shopItemsRenderer.setCheckboxes(this._cartItemsRenderer.manager.items);
        });
        this._shopItemsRenderer.wrapperClass.addEventListener('click', (event) => {
            const target = event.target;
            if (target.className == 'add-card__checkbox') {
                const currentItem = event.target;
                const parentItem = currentItem.parentElement;
                const currentItemId = Number(parentItem.dataset.id);
                const itemById = this._shopItemsRenderer.manager.findItem(currentItemId);
                if (target.checked)
                    this._cartItemsRenderer.manager.addItem(itemById);
                else
                    this._cartItemsRenderer.manager.removeItem(currentItemId);
                this._cartItemsRenderer.updateRender();
            }
        });
    }
}

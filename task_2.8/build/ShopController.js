"use strict";
class ShopController {
    constructor(itemsRenderer, cartRenderer) {
        this._itemsRenderer = itemsRenderer;
        this._cartRenderer = cartRenderer;
    }
    checkoutItem(itemId) {
        this._itemsRenderer.renderAllItems();
        this._cartRenderer.cardManager.addItemToCart(this._itemsRenderer.itemsManager.findItem(itemId));
    }
}

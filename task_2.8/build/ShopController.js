"use strict";
class ShopController {
    constructor(itemsRenderer, cartRenderer) {
        this._itemsRenderer = itemsRenderer;
        this._cartRenderer = cartRenderer;
    }
}
// ShopItemsManager
//                  \
//                    ShopItemsRenderer
//                                     \
//                                       ShopController
//                                     /
//                    CartItemsRenderer
//                  /                  \
// CartItemsManager                      CartController

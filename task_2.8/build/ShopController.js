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
    constructor(itemsRenderer, cartRenderer) {
        this._itemsRenderer = itemsRenderer;
        this._cartRenderer = cartRenderer;
    }
}

class ShopController {
    private _itemsRenderer: ShopItemsRenderer;
    private _cartRenderer: CartItemsRenderer;

    constructor(itemsRenderer: ShopItemsRenderer, cartRenderer: CartItemsRenderer) {
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
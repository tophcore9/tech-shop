"use strict";
// ShopItemsManager
//                  \
//                    ShopItemsRenderer
//                                     \
//                                       ShopController
//                                     /
//                    CartItemsRenderer
//                  /                  \
// CartItemsManager                      CartMenuController <--
class CartMenuController {
    constructor(cartItemsRenderer) {
        this._cartItemsRenderer = cartItemsRenderer;
        this._cartItemsRenderer.updateRender();
        this._cartWrapperClass = document.querySelector('.cart-menu');
        this._cartMenuCloseButton = this._cartWrapperClass.querySelector('.cart-menu__close');
        this._navMenuCartButton = document.querySelector('.nav-cart');
        this._navMenuCartButton.addEventListener('click', this.showCart.bind(this));
        this._cartMenuCloseButton.addEventListener('click', this.hideCart.bind(this));
    }
    showCart() {
        this._cartWrapperClass.classList.add('show-cart-menu');
    }
    hideCart() {
        this._cartWrapperClass.classList.remove('show-cart-menu');
    }
}

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
    private _cartWrapperClass: HTMLElement;
    private _cartItemsRenderer: CartItemsRenderer;

    private _navMenuCartButton: HTMLButtonElement;
    private _cartMenuCloseButton: HTMLButtonElement;

    constructor(cartItemsRenderer: CartItemsRenderer) {
        this._cartItemsRenderer = cartItemsRenderer;
        this._cartItemsRenderer.updateRender();

        this._cartWrapperClass = document.querySelector('.cart-menu') as HTMLElement;

        this._cartMenuCloseButton = this._cartWrapperClass.querySelector('.cart-menu__close') as HTMLButtonElement;
        this._navMenuCartButton = document.querySelector('.nav-cart') as HTMLButtonElement;

        this._navMenuCartButton.addEventListener('click', this.showCart.bind(this));
        this._cartMenuCloseButton.addEventListener('click', this.hideCart.bind(this));
    }

    public showCart() {
        this._cartWrapperClass.classList.add('show-cart-menu');
    }

    public hideCart() {
        this._cartWrapperClass.classList.remove('show-cart-menu');
    }
}

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
        
        this._cartItemsRenderer.wrapperClass.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const targetItem = target.parentElement?.parentElement?.parentElement as HTMLElement;
            const targetItemId = Number(targetItem.dataset.id as string)

            if (targetItem.querySelector('.cart-item__minus') == event.target) {
                const currentCount = this._cartItemsRenderer.manager.decreaseItemCount(targetItemId);
                const quantityField = targetItem.querySelector('.cart-item__quantity') as HTMLElement;
                quantityField.innerHTML = currentCount.toString();
                this._cartItemsRenderer.updateRender();
            }
            else if (targetItem.querySelector('.cart-item__plus') == event.target) {
                const currentCount = this._cartItemsRenderer.manager.increaseItemCount(targetItemId);
                const quantityField = targetItem.querySelector('.cart-item__quantity') as HTMLElement;
                quantityField.innerHTML = currentCount.toString();
                this._cartItemsRenderer.updateRender();
            }
        })
    }

    public showCart() {
        this._cartWrapperClass.classList.add('show-cart-menu');
    }

    public hideCart() {
        this._cartWrapperClass.classList.remove('show-cart-menu');
    }
}

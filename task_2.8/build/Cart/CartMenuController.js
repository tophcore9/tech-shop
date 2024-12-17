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
        this._cartItemsRenderer.wrapperClass.addEventListener('click', (event) => {
            var _a, _b;
            const target = event.target;
            const targetItem = (_b = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
            const targetItemId = Number(targetItem.dataset.id);
            const quantityField = targetItem.querySelector('.cart-item__quantity');
            if (this.isTargetButton(targetItem, target, 'cart-item__minus')) {
                const currentCount = this._cartItemsRenderer.manager.decreaseItemCount(targetItemId);
                quantityField.innerHTML = currentCount.toString();
            }
            else if (this.isTargetButton(targetItem, target, 'cart-item__plus')) {
                const currentCount = this._cartItemsRenderer.manager.increaseItemCount(targetItemId);
                quantityField.innerHTML = currentCount.toString();
            }
            else if (this.isTargetButton(targetItem, target, 'cart-item__remove-button')) {
                this._cartItemsRenderer.manager.removeItem(targetItemId);
            }
            this._cartItemsRenderer.updateRender();
        });
    }
    handleIncrease() { }
    handleDecrease() { }
    handleRemove() { }
    isTargetButton(rootElement, target, className) {
        if (target == rootElement.querySelector('.' + className))
            return true;
        return false;
    }
    showCart() {
        this._cartWrapperClass.classList.add('show-cart-menu');
    }
    hideCart() {
        this._cartWrapperClass.classList.remove('show-cart-menu');
    }
}

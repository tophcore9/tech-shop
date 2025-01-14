"use strict";
class CartMenuController {
    constructor(cartItemsRenderer) {
        this._cartMenu = document.querySelector('.cart-menu');
        this._closeCartButton = this._cartMenu.querySelector('.cart-menu__close');
        this._navMenu = document.querySelector('.nav');
        this._openCartButton = document.querySelector('.nav-cart');
        this._openNavButton = this._navMenu.querySelector('.nav-more');
        this._closeNavButton = this._navMenu.querySelector('.close-nav-more');
        this._cartItemsRenderer = cartItemsRenderer;
        this._cartItemsRenderer.updateRender();
        this.initNavButtonsEvents();
        this.initCartButtonsEvents();
    }
    handleIncrease(itemId) {
        const afterIncrease = this._cartItemsRenderer.manager.increaseItemCount(itemId);
        return afterIncrease;
    }
    handleDecrease(itemId) {
        const afterDecrease = this._cartItemsRenderer.manager.decreaseItemCount(itemId);
        return afterDecrease;
    }
    handleRemove(itemId) {
        this._cartItemsRenderer.manager.removeItem(itemId);
    }
    isTargetButton(rootElement, target, className) {
        if (target == rootElement.querySelector('.' + className))
            return true;
        return false;
    }
    getElementId(element) {
        return Number(element.dataset.id);
    }
    showCart() {
        this._cartMenu.classList.add('show-cart-menu');
    }
    hideCart() {
        this._cartMenu.classList.remove('show-cart-menu');
    }
    showNav() {
        this.hideCart();
        this._navMenu.classList.add('nav-shown');
        this.hideNavControls();
    }
    hideNav() {
        this._navMenu.classList.remove('nav-shown');
        this.showNavControls();
    }
    hideNavControls() {
        this._openCartButton.style.display = 'none';
        this._openNavButton.style.display = 'none';
    }
    showNavControls() {
        this._openCartButton.style.display = 'block';
        this._openNavButton.style.display = 'block';
    }
    initCartButtonsEvents() {
        this._openCartButton.addEventListener('click', this.showCart.bind(this));
        this._closeCartButton.addEventListener('click', this.hideCart.bind(this));
        /* Handling item buttons in the cart */
        this._cartItemsRenderer.wrapperClass.addEventListener('click', (event) => {
            const target = event.target;
            const targetItem = target.closest('.cart-menu__item');
            const targetItemId = this.getElementId(targetItem);
            const quantityField = targetItem.querySelector('.cart-item__quantity');
            if (this.isTargetButton(targetItem, target, 'cart-item__minus')) {
                quantityField.innerHTML = this.handleDecrease(targetItemId).toString();
            }
            else if (this.isTargetButton(targetItem, target, 'cart-item__plus')) {
                quantityField.innerHTML = this.handleIncrease(targetItemId).toString();
            }
            else if (this.isTargetButton(targetItem, target, 'cart-item__remove-button')) {
                this.handleRemove(targetItemId);
            }
            this._cartItemsRenderer.updateRender();
        });
    }
    initNavButtonsEvents() {
        this._openNavButton.addEventListener('click', this.showNav.bind(this));
        this._closeNavButton.addEventListener('click', this.hideNav.bind(this));
    }
}

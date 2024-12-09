"use strict";
class CartManager {
    constructor() {
        this._navCart = document.querySelector('.nav-cart');
        this._asideCart = document.querySelector('.cart-menu');
        this._closeCartButton = document.querySelector('.cart-menu__close');
        this._navCart.addEventListener('click', this.showCartMenu.bind(this));
        this._closeCartButton.addEventListener('click', this.hideCartMenu.bind(this));
    }
    showCartMenu() {
        this._asideCart.classList.add('show-cart-menu');
    }
    hideCartMenu() {
        this._asideCart.classList.remove('show-cart-menu');
    }
}

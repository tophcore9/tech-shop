"use strict";
class CartRenderer {
    constructor() {
        this._cartManager = new CartManager();
        this._cartMenu = document.querySelector('.cart-menu');
        this._navCartMenu = document.querySelector('.nav-cart');
        this._cartMenuClose = document.querySelector('.cart-menu__close');
        this._totalPrice = document.querySelector('.total-price');
        this._cartItemsWrapper = document.querySelector('.cart-menu__items');
        this._navCartMenu.addEventListener('click', this.showMenuCart.bind(this));
        this._cartMenuClose.addEventListener('click', this.hideMenuCart.bind(this));
        this.updateCartItemsRender();
        window.addEventListener('storage', (event) => {
            console.log('change');
        });
        this._cartManager.addItemToCart({
            id: 3,
            name: 'Apple Watch Series 10',
            price: 500,
            imageUrl: 'https://brain.com.ua/static/images/prod_img/3/0/U0961730_big_1726061269.jpg',
            ratingStars: 5,
            category: 'Watches',
        });
    }
    get cardManager() {
        return this._cartManager;
    }
    /* Showing a menu cart by adding an according class */
    showMenuCart() {
        this._cartMenu.classList.add('show-cart-menu');
    }
    /* Hiding a menu cart by removing an according class */
    hideMenuCart() {
        this._cartMenu.classList.remove('show-cart-menu');
    }
    removeRenderedCartItems() {
        this._cartItemsWrapper.innerHTML = '';
    }
    updateCartItemsRender() {
        this.removeRenderedCartItems();
        this._cartManager.getAllCartItems().forEach((cartItem) => {
        });
        this._totalPrice.innerHTML = '$' + this._cartManager.getTotalValue();
    }
}

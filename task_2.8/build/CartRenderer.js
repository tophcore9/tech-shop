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
    }
    getCardManager() {
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
            this._cartItemsWrapper.innerHTML += `
                <div class="cart-menu__item" data-id="${cartItem.id}">
                    <div class="cart-item__left">
                        <img class="cart-item__picture" src="${cartItem.imageUrl}" alt="">
                        <div class="cart-item__info">
                            <div class="cart-item__name">${cartItem.name}</div>
                            <div class="cart-item__price">$${cartItem.price}</div>
                        </div>
                    </div>
                    <div class="cart-item__right">
                        <div class="cart-item__control">
                            <button class="cart-item__minus quantity-button">−</button>
                            <div class="cart-item__quantity">${cartItem.count}</div>
                            <button class="cart-item__plus quantity-button">+</button>
                        </div>
                        <button class="cart-item__remove-button">Remove</button>
                    </div>
                </div>
            `;
        });
        this._totalPrice.innerHTML = '$' + this._cartManager.getTotalValue();
    }
}

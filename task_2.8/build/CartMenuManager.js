"use strict";
class CartManager {
    constructor(itemsManager) {
        this._itemsManager = itemsManager;
        this._cartItems = new CartItems();
        this._navCart = document.querySelector('.nav-cart');
        this._asideCart = document.querySelector('.cart-menu');
        this._closeCartButton = document.querySelector('.cart-menu__close');
        this._items = document.querySelector('.cart-menu__items');
        this._totalPrice = document.querySelector('.total-price');
        this._cartItemQuantity = document.querySelector('.cart-item__quantity');
        this._cartItemMinus = document.querySelector('.cart-item__minus');
        this._cartItemPlus = document.querySelector('.cart-item__plus');
        this._navCart.addEventListener('click', this.showCartMenu.bind(this));
        this._closeCartButton.addEventListener('click', this.hideCartMenu.bind(this));
    }
    showCartMenu() {
        this._asideCart.classList.add('show-cart-menu');
    }
    hideCartMenu() {
        this._asideCart.classList.remove('show-cart-menu');
    }
    removeItems() {
        this._items.innerHTML = '';
    }
    updateItems() {
        const items = this._itemsManager.getItems();
        let totalPrice = 0;
        this.removeItems();
        items.forEach((item) => {
            if (item.isInCart) {
                this._items.innerHTML += `
                    <div class="cart-menu__item" data-id="${item.id}">
                        <div class="cart-item__left">
                            <img class="cart-item__picture" src="${item.imageUrl}" alt="">
                            <div class="cart-item__info">
                                <div class="cart-item__name">${item.name}</div>
                                <div class="cart-item__price">$${item.price}</div>
                            </div>
                        </div>
                        <div class="cart-item__right">
                            <div class="cart-item__control">
                                <button class="cart-item__minus quantity-button">−</button>
                                <div class="cart-item__quantity">1</div>
                                <button class="cart-item__plus quantity-button">+</button>
                            </div>
                            <button class="cart-item__remove-button">Remove</button>
                        </div>
                    </div>
                `;
                totalPrice += item.price;
            }
        });
        this._totalPrice.innerHTML = '$' + totalPrice;
    }
    increaseCount(itemId) {
        let currentCount = Number(this._cartItemQuantity.innerHTML) + 1;
        this._cartItemQuantity.innerHTML = currentCount.toString();
    }
    decreaseCount(itemId) {
        let currentCount = Number(this._cartItemQuantity.innerHTML) - 1;
        this._cartItemQuantity.innerHTML = currentCount.toString();
    }
}

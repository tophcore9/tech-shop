"use strict";
class CartItemsRenderer extends BaseItemsRenderer {
    constructor(itemsWrapperClassName, cartManager) {
        super(itemsWrapperClassName, cartManager);
    }
    renderItem(item) {
        this._wrapperClass.innerHTML += `
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
                        <div class="cart-item__quantity">${item.count}</div>
                        <button class="cart-item__plus quantity-button">+</button>
                    </div>
                    <button class="cart-item__remove-button">Remove</button>
                </div>
            </div>
        `;
    }
}

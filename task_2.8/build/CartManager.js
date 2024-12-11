"use strict";
class CartManager {
    constructor() {
        this._cartItemsField = 'cartItems';
        this._cartItems = [];
        this.loadCartItems();
    }
    /* Adding a new item to cart */
    addItemToCart(item) {
        this._cartItems.push(Object.assign(Object.assign({}, item), { count: 1 }));
        this.saveCartItems();
    }
    /*
     * Removing the item from cart
     * If item deleted return true, otherwise false
     */
    removeItemFromCart(itemId) {
        for (let i = 0; i < this._cartItems.length; ++i) {
            if (this._cartItems[i].id === itemId) {
                this._cartItems.splice(i, 1);
                this.saveCartItems();
                return true;
            }
        }
        return false;
    }
    /* Getting all the items that are already in the cart */
    getAllCartItems() {
        return this._cartItems;
    }
    /* Looking for an item in the cart, if it's not found return null */
    findItem(itemId) {
        let foundItem = null;
        this._cartItems.forEach((item) => {
            if (item.id === itemId)
                foundItem = item;
        });
        return foundItem;
    }
    /* Counting the total value of the each items in the cart */
    getTotalValue() {
        let totalValue = 0;
        this._cartItems.forEach((item) => {
            totalValue += item.price;
        });
        return totalValue;
    }
    /* Increasing count of the exact item in the cart */
    increaseItemCount(itemId) {
        this._cartItems.forEach((item) => {
            if (item.id == itemId) {
                item.count++;
                return;
            }
        });
    }
    /* Decreasing count of the exact item in the cart */
    decreaseItemCount(itemId) {
        this._cartItems.forEach((item) => {
            if (item.id == itemId) {
                item.count--;
                return;
            }
        });
    }
    /* Loading menu cart items from localStorage */
    loadCartItems() {
        if (localStorage.getItem(this._cartItemsField) != null) {
            this._cartItems = JSON.parse(localStorage.getItem(this._cartItemsField));
        }
        else {
            this._cartItems = [];
            this.saveCartItems();
        }
    }
    /* Saving menu cart items to localStorage */
    saveCartItems() {
        localStorage.setItem(this._cartItemsField, JSON.stringify(this._cartItems));
    }
}
// this._cartItemsWrapper.innerHTML += `
//     <div class="cart-menu__item" data-id="${cartItem.id}">
//         <div class="cart-item__left">
//             <img class="cart-item__picture" src="${cartItem.imageUrl}" alt="">
//             <div class="cart-item__info">
//                 <div class="cart-item__name">${cartItem.name}</div>
//                 <div class="cart-item__price">$${cartItem.price}</div>
//             </div>
//         </div>
//         <div class="cart-item__right">
//             <div class="cart-item__control">
//                 <button class="cart-item__minus quantity-button">−</button>
//                 <div class="cart-item__quantity">${cartItem.count}</div>
//                 <button class="cart-item__plus quantity-button">+</button>
//             </div>
//             <button class="cart-item__remove-button">Remove</button>
//         </div>
//     </div>
// `;
// this._shopCards.innerHTML += `
//     <div class="shop__card" data-id="${item.id}">
//         <input type="checkbox" class="add-card__checkbox" ${checked}>
//         <img class="card__picture" src="${item.imageUrl}" alt="">
//         <div class="card-info">
//             <span class="card-info__name">${item.name}</span>
//             <span class="card-info__price">$${item.price}</span>
//             <div class="card-info__rating">
//                 <div class="rating-star"></div>
//                 <div class="rating-star"></div>
//                 <div class="rating-star"></div>
//                 <div class="rating-star"></div>
//                 <div class="rating-star"></div>
//             </div>
//             <span class="card-info__category">${item.category}</span>
//         </div>
//     </div>
// `;

"use strict";
class ShopManager {
    constructor(itemsManager, cartManager) {
        this._itemsManager = itemsManager;
        this._cartManager = cartManager;
        this._cards = document.querySelector('.shop-cards');
        this._cards.addEventListener('click', (event) => {
            const button = event.target;
            const card = button.parentElement;
            this._itemsManager.toggleCartState(Number(card.dataset.id));
            this._cartManager.updateItems();
        });
    }
    removeItems() {
        this._cards.innerHTML = '';
    }
    updateItems() {
        const items = this._itemsManager.getItems();
        this.removeItems();
        items.forEach((item) => {
            let isInCart = '';
            if (item.isInCart)
                isInCart = 'checked';
            this._cards.innerHTML += `
                <div class="shop__card" data-id="${item.id}">
                    <input type="checkbox" class="add-card__checkbox" ${isInCart}>
                    <img class="card__picture" src="${item.imageUrl}" alt="">
                    <div class="card-info">
                        <span class="card-info__name">${item.name}</span>
                        <span class="card-info__price">$${item.price}</span>
                        <div class="card-info__rating">
                            <div class="rating-star"></div>
                            <div class="rating-star"></div>
                            <div class="rating-star"></div>
                            <div class="rating-star"></div>
                            <div class="rating-star"></div>
                        </div>
                        <span class="card-info__category">${item.category}</span>
                    </div>
                </div>
            `;
        });
    }
}

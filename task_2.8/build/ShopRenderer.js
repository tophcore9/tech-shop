"use strict";
class ShopRenderer {
    constructor(itemsManager, cartManager) {
        this._itemsManager = itemsManager;
        this._cartManager = cartManager;
        this._shopCards = document.querySelector('.shop-cards');
        this._cards = document.getElementsByClassName('shop__card');
        this.renderAllItems();
        [...this._cards].forEach((card) => {
            card.addEventListener('click', (event) => {
                const currentCheckbox = event.target;
                const currentCard = event.currentTarget;
                const currentCardId = Number(currentCard.dataset.id);
                if (currentCheckbox.checked) {
                    this._cartManager.addItemToCart(this._itemsManager.findItem(currentCardId));
                }
                else {
                    this._cartManager.removeItemFromCart(currentCardId);
                }
            });
        });
    }
    removeAllItems() {
        this._shopCards.innerHTML = '';
    }
    renderAllItems() {
        this.removeAllItems();
        this._itemsManager.getAllItems().forEach((item) => {
            let checked = '';
            if (this._cartManager.findItem(item.id) != null)
                checked = 'checked';
            this._shopCards.innerHTML += `
                <div class="shop__card" data-id="${item.id}">
                    <input type="checkbox" class="add-card__checkbox" ${checked}>
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

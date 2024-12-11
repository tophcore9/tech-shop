"use strict";
class ItemsRenderer {
    constructor(itemsManager) {
        this._itemsManager = itemsManager;
        this._shopCards = document.querySelector('.shop-cards');
        this._cards = document.getElementsByClassName('shop__card');
        this._topics = document.getElementsByClassName('topic-item__radio');
        this._valueSlider = document.querySelector('.price__range');
        this._priceValue = document.querySelector('.price__value');
        this._valueSlider.value = this._valueSlider.max = this._itemsManager.getMaxPrice().toString();
        this._priceValue.innerHTML = 'Value: $' + this._valueSlider.value;
        this.renderAllItems();
    }
    // private addEventListenersForCheckboxes() {
    //     [...this._cards].forEach((card) => {
    //         card.addEventListener('click', (event) => {
    //             const currentCheckbox = event.target as HTMLInputElement;
    //             const currentCard = event.currentTarget as HTMLElement;
    //             const currentCardId = Number(currentCard.dataset.id as string);
    //             if (currentCheckbox.checked) {
    //                 this._cartManager.addItemToCart(this._itemsManager.findItem(currentCardId) as Item);
    //             } else {
    //                 this._cartManager.removeItemFromCart(currentCardId);
    //             }
    //         });
    //     });
    // }
    get itemsManager() {
        return this.itemsManager;
    }
    removeAllItems() {
        this._shopCards.innerHTML = '';
    }
    hideAllItems() {
        [...this._cards].forEach((card) => {
            card.classList.add('shop__card-hidden');
        });
    }
    showAllItems() {
        [...this._cards].forEach((card) => {
            card.classList.remove('shop__card-hidden');
        });
    }
    showFilteredItemsByCategory(filterName) {
        this.hideAllItems();
        [...this._cards].forEach((item) => {
            var _a;
            if (((_a = this._itemsManager.findItem(Number(item.dataset.id))) === null || _a === void 0 ? void 0 : _a.category) == filterName)
                item.classList.remove('shop__card-hidden');
        });
    }
    showFilteredItemsByPrice(maxPrice) {
        this.hideAllItems();
        [...this._cards].forEach((item) => {
            var _a;
            if (Number((_a = this._itemsManager.findItem(Number(item.dataset.id))) === null || _a === void 0 ? void 0 : _a.price) < maxPrice)
                item.classList.remove('shop__card-hidden');
        });
    }
    renderAllItems() {
        this.removeAllItems();
        this._itemsManager.items.forEach((item) => {
            let checked = '';
            // if (this._cartManager.findItem(item.id) != null) checked = 'checked';
        });
    }
}

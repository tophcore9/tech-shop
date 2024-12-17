"use strict";
class ShopFilters {
    constructor(renderer, cartItems) {
        var _a, _b;
        this._topics = document.getElementsByClassName('topic-item__radio');
        this._currentTopic = document.querySelector('.topics__item');
        this._priceRange = document.querySelector('.price__range');
        this._priceValue = document.querySelector('.price__value');
        this._searchInput = document.querySelector('.search__input');
        this._searchButton = document.querySelector('.search__button');
        this._shopItemsRenderer = renderer;
        this._items = this._shopItemsRenderer.manager.items;
        this._cartItems = cartItems;
        this.initPriceRange();
        this._searchButton.addEventListener('click', () => {
            let filteredItems = [];
            if (this._currentTopic.value == '') {
                this._shopItemsRenderer.updateRender();
            }
            else if (this._currentTopic.value == 'All') {
                filteredItems = Filtrator.filterByName(this._items, this._searchInput.value);
                this._shopItemsRenderer.updateCustomRender(filteredItems);
            }
            else {
                filteredItems = Filtrator.filterByNameInCategory(this._items, this._searchInput.value, this._currentTopic.value);
                this._shopItemsRenderer.updateCustomRender(filteredItems);
            }
        });
        window.addEventListener('keypress', (event) => {
            if (event.key == 'Enter')
                this._searchButton.click();
        });
        [...this._topics].forEach((topic) => {
            topic.addEventListener('click', () => {
                let filteredItems = this._shopItemsRenderer.manager.items;
                if (topic.value != 'All') {
                    filteredItems = Filtrator.filterByCategory(this._items, topic.value);
                    this._shopItemsRenderer.updateCustomRender(filteredItems);
                }
                this._shopItemsRenderer.updateCustomRender(filteredItems);
                this._shopItemsRenderer.setCheckboxes(this._cartItems);
                this._currentTopic = topic;
                this._priceRange.value = this._priceRange.max;
                this.updatePriceValue();
                document.documentElement.scrollTop = 0;
            });
        });
        (_a = document.querySelector('.price__range')) === null || _a === void 0 ? void 0 : _a.addEventListener('input', this.updatePriceValue.bind(this));
        (_b = document.querySelector('.price__range')) === null || _b === void 0 ? void 0 : _b.addEventListener('change', () => {
            let filteredItems = [];
            if (this._currentTopic.value != 'All') {
                filteredItems = Filtrator.filterByPriceInCategory(this._items, Number(this._priceRange.value), this._currentTopic.value);
            }
            else {
                filteredItems = Filtrator.filterByPrice(this._items, Number(this._priceRange.value));
            }
            this._shopItemsRenderer.updateCustomRender(filteredItems);
            this._shopItemsRenderer.setCheckboxes(this._cartItems);
        });
    }
    initPriceRange() {
        this._priceRange.max = this._shopItemsRenderer.manager.getMaxPrice().toString();
        this._priceRange.min = this._shopItemsRenderer.manager.getMinPrice().toString();
        this._priceRange.value = this._priceRange.max;
        this.updatePriceValue();
    }
    updatePriceValue() {
        this._priceValue.innerHTML = 'Value: $' + this._priceRange.value;
    }
}

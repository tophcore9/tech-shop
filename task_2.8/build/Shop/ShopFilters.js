"use strict";
class ShopFilters {
    constructor(renderer, cartItems) {
        this._topics = document.getElementsByClassName('topic-item__radio');
        this._currentTopic = this._topics[0];
        this._priceRange = document.querySelector('.price__range');
        this._priceValue = document.querySelector('.price__value');
        this._searchInput = document.querySelector('.search__input');
        this._searchButton = document.querySelector('.search__button');
        this._cartItems = cartItems;
        this._shopItemsRenderer = renderer;
        this._shopItems = this._shopItemsRenderer.manager.items;
        this.initPriceRange();
        this.initPriceRangeEvents();
        this.initTopicSelectorEvents();
        this.initSearchEvents();
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
    initSearchEvents() {
        this._searchButton.addEventListener('click', () => {
            let filteredItems = [];
            if (this._currentTopic.value == '') {
                this._shopItemsRenderer.updateRender();
            }
            else if (this._currentTopic.value == 'All') {
                filteredItems = Filtrator.filterByName(this._shopItemsRenderer.manager.items, this._searchInput.value);
                this._shopItemsRenderer.updateCustomRender(filteredItems);
            }
            else {
                filteredItems = Filtrator.filterByNameInCategory(this._shopItems, this._searchInput.value, this._currentTopic.value);
                this._shopItemsRenderer.updateCustomRender(filteredItems);
            }
        });
        window.addEventListener('keypress', (event) => {
            if (event.key == 'Enter')
                this._searchButton.click();
        });
    }
    initPriceRangeEvents() {
        var _a, _b;
        (_a = document.querySelector('.price__range')) === null || _a === void 0 ? void 0 : _a.addEventListener('input', this.updatePriceValue.bind(this));
        (_b = document.querySelector('.price__range')) === null || _b === void 0 ? void 0 : _b.addEventListener('change', () => {
            let filteredItems = [];
            if (this._currentTopic.value != 'All') {
                filteredItems = Filtrator.filterByPriceInCategory(this._shopItems, Number(this._priceRange.value), this._currentTopic.value);
            }
            else {
                filteredItems = Filtrator.filterByPrice(this._shopItems, Number(this._priceRange.value));
            }
            this._shopItemsRenderer.updateCustomRender(filteredItems);
            this._shopItemsRenderer.setCheckboxes(this._cartItems);
        });
    }
    initTopicSelectorEvents() {
        [...this._topics].forEach((topic) => {
            topic.addEventListener('click', () => {
                let filteredItems = this._shopItemsRenderer.manager.items;
                if (topic.value != 'All') {
                    filteredItems = Filtrator.filterByCategory(this._shopItems, topic.value);
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
    }
}

"use strict";
// ShopItemsManager
//                  \
//                    ShopItemsRenderer
//                                     \
//                                       ShopController <--
//                                     /
//                    CartItemsRenderer
//                  /                  \
// CartItemsManager                      CartMenuController
class ShopController {
    constructor(shopItemsRenderer, cartItemsRenderer) {
        var _a, _b, _c;
        this._shopItemsRenderer = shopItemsRenderer;
        this._cartItemsRenderer = cartItemsRenderer;
        this._shopFiltrator = new ShopFiltrator(this._shopItemsRenderer.manager.items);
        this._topics = this._topics = document.getElementsByClassName('topic-item__radio');
        this._currentTopic = document.querySelector('.topics__item');
        this._priceRange = document.querySelector('.price__range');
        this._priceValue = document.querySelector('.price__value');
        this._cardCheckboxes = this._shopItemsRenderer.wrapperClass.getElementsByClassName('add-card__checkbox');
        this._searchInput = document.querySelector('.search__input');
        this._searchButton = document.querySelector('.search__button');
        this._searchButton.addEventListener('click', () => {
            let filteredItems = [];
            if (this._currentTopic.value == '') {
                this._shopItemsRenderer.updateRender();
            }
            else if (this._currentTopic.value == 'All') {
                filteredItems = this._shopFiltrator.filterByName(this._searchInput.value);
                this._shopItemsRenderer.updateCustomRender(filteredItems);
            }
            else {
                filteredItems = this._shopFiltrator.filterByNameAndCategory(this._searchInput.value, this._currentTopic.value);
                this._shopItemsRenderer.updateCustomRender(filteredItems);
            }
        });
        window.addEventListener('keypress', (event) => {
            if (event.key == 'Enter')
                this._searchButton.click();
        });
        this._shopItemsRenderer.renderItems();
        this.setCheckboxes();
        (_a = document.querySelector('.cart-menu__close')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.setCheckboxes.bind(this));
        this._shopItemsRenderer.wrapperClass.addEventListener('click', (event) => {
            const target = event.target;
            if (target.className == 'add-card__checkbox') {
                const currentItem = event.target;
                const parentItem = currentItem.parentElement;
                const currentItemId = Number(parentItem.dataset.id);
                const itemById = this._shopItemsRenderer.manager.findItem(currentItemId);
                if (target.checked) {
                    this._cartItemsRenderer.manager.addItem(itemById);
                }
                else {
                    this._cartItemsRenderer.manager.removeItem(currentItemId);
                }
                this._cartItemsRenderer.updateRender();
            }
        });
        [...this._topics].forEach((topic) => {
            topic.addEventListener('click', () => {
                let filteredItems = this._shopItemsRenderer.manager.items;
                if (topic.value != 'All') {
                    filteredItems = this._shopFiltrator.filterByCategory(topic.value);
                    this._shopItemsRenderer.updateCustomRender(filteredItems);
                }
                this._shopItemsRenderer.updateCustomRender(filteredItems);
                this.setCheckboxes();
                this._currentTopic = topic;
                this._priceRange.value = this._priceRange.max;
                this._priceValue.innerHTML = 'Value: $' + this._priceRange.value;
            });
        });
        this._priceRange.max = this._shopItemsRenderer.manager.getMaxPrice().toString();
        this._priceRange.value = this._priceRange.max;
        this._priceValue.innerHTML = 'Value: $' + this._priceRange.value;
        (_b = document.querySelector('.price__range')) === null || _b === void 0 ? void 0 : _b.addEventListener('input', () => {
            this._priceValue.innerHTML = 'Value: $' + this._priceRange.value;
        });
        (_c = document.querySelector('.price__range')) === null || _c === void 0 ? void 0 : _c.addEventListener('change', () => {
            let filteredItems = [];
            if (this._currentTopic.value != 'All') {
                filteredItems = this._shopFiltrator.filterByPriceAndCategory(Number(this._priceRange.value), this._currentTopic.value);
            }
            else {
                filteredItems = this._shopFiltrator.filterByPrice(Number(this._priceRange.value));
            }
            this._shopItemsRenderer.updateCustomRender(filteredItems);
            this.setCheckboxes();
        });
    }
    setCheckboxes() {
        [...this._cardCheckboxes].forEach((checkbox) => {
            const parent = checkbox.parentElement;
            const parentId = Number(parent === null || parent === void 0 ? void 0 : parent.dataset.id);
            if (this._cartItemsRenderer.manager.findItem(parentId))
                checkbox.checked = true;
            else
                checkbox.checked = false;
        });
    }
}

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
        var _a;
        this._shopItemsRenderer = shopItemsRenderer;
        this._cartItemsRenderer = cartItemsRenderer;
        this._shopFiltrator = new ShopFiltrator(this._shopItemsRenderer.manager.items);
        this._topics = document.getElementsByClassName('topic-item__radio');
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
            topic.addEventListener('click', (event) => {
                let filteredItems = this._shopItemsRenderer.manager.items;
                if (topic.value != 'All') {
                    filteredItems = this._shopFiltrator.filterByCategory(topic.value);
                    this._shopItemsRenderer.updateCustomRender(filteredItems);
                }
                this._shopItemsRenderer.updateCustomRender(filteredItems);
                this.setCheckboxes();
            });
        });
    }
    setCheckboxes() {
        [...this._shopItemsRenderer.checkboxes].forEach((checkbox) => {
            const parent = checkbox.parentElement;
            const parentId = Number(parent === null || parent === void 0 ? void 0 : parent.dataset.id);
            if (this._cartItemsRenderer.manager.findItem(parentId))
                checkbox.checked = true;
            else
                checkbox.checked = false;
        });
    }
}

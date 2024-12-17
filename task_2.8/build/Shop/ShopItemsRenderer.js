"use strict";
class ShopItemsRenderer extends BaseItemsRenderer {
    constructor(itemsWrapperClassName, shopItemsManager) {
        super(itemsWrapperClassName, shopItemsManager);
    }
    /* Rendering an item */
    renderItem(item) {
        this._wrapperClass.innerHTML += `
            <div class="shop__card" data-id="${item.id}">
                <input type="checkbox" class="add-card__checkbox">
                <img class="card__picture" src="${item.imageUrl}" alt="">
                <div class="card-info">
                    <span class="card-info__name">${item.name}</span>
                    <span class="card-info__price">$${item.price}</span>
                    <div class="card-info__rating">
                    ${this.renderStars(item.ratingStars)}
                    </div>
                    <span class="card-info__category">${item.category}</span>
                </div>
            </div>
        `;
    }
    /* Rendering rating stars for items */
    renderStars(count) {
        let resultHTML = '';
        for (let i = 0; i < count; ++i) {
            resultHTML += `<div class="rating-star"></div>`;
        }
        return resultHTML;
    }
    setCheckboxes(cartItems) {
        const checkboxes = document.getElementsByClassName('add-card__checkbox');
        [...checkboxes].forEach((checkbox) => {
            const parent = checkbox.parentElement;
            const parentId = Number(parent === null || parent === void 0 ? void 0 : parent.dataset.id);
            cartItems.forEach((cartItem) => {
                if (cartItem.id == parentId)
                    checkbox.checked = true;
            });
        });
    }
}

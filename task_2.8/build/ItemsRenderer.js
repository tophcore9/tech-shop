"use strict";
class ItemsRenderer extends BaseRenderer {
    constructor(cartMenuClassName, cartManager) {
        super(cartMenuClassName, cartManager);
    }
    renderItem(item) {
        this._wrapperClass.innerHTML += `
            <div class="shop__card" data-id="${item.id}">
                <input type="checkbox" class="add-card__checkbox">
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
    }
}

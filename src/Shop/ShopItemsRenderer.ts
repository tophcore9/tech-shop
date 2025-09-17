class ShopItemsRenderer extends BaseItemsRenderer<Item, ShopItemsManager> {
    constructor(itemsWrapperClassName: string, shopItemsManager: ShopItemsManager) {
        super(itemsWrapperClassName, shopItemsManager);
    }

    /* Rendering an item */
    public renderItem(item: Item): void {
        this._wrapperClass.innerHTML += `
            <div class="shop__card" data-id="${item.id}">
                <input type="checkbox" class="add-card__checkbox">
                <img class="card__picture" src="${item.imageUrl}" alt="">
                <div class="card-info">
                    <div class="card-info__block">
                        <span class="card-info__name">${item.name}</span>
                        <span class="card-info__price">$${item.price}</span>
                    </div>
                    <div class="card-info__block">
                        <span class="card-info__category">${item.category}</span>
                        <div class="card-info__rating">
                        ${this.renderStars(item.ratingStars)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /* Rendering rating stars for items */
    public renderStars(count: number): string {
        let resultHTML = '';

        for (let i = 0; i < count; ++i) {
            resultHTML += `<div class="rating-star"></div>`;
        }

        return resultHTML;
    }

    public setCheckboxes(cartItems: CartItem[]) {
        const checkboxes = document.getElementsByClassName('add-card__checkbox') as HTMLCollectionOf<HTMLInputElement>;

        [...checkboxes].forEach((checkbox) => {
            const parentId = Number(checkbox.parentElement?.dataset.id as string);
            checkbox.checked = false;

            cartItems.forEach((cartItem) => {
                if (cartItem.id == parentId) checkbox.checked = true;
            })
        });
    }
}

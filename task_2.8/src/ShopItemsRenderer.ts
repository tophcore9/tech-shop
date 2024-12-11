class ShopItemsRenderer extends BaseItemsRenderer<Item,ShopItemsManager> {
    private _cardCheckboxes: HTMLCollectionOf<HTMLInputElement>;

    constructor(itemsWrapperClassName: string, shopItemsManager: ShopItemsManager) {
        super(itemsWrapperClassName, shopItemsManager);
        
        this._cardCheckboxes = this._wrapperClass.getElementsByClassName('add-card__checkbox') as HTMLCollectionOf<HTMLInputElement>;
    }
    
    public get checkboxes(): HTMLCollectionOf<HTMLInputElement> {
        return this._cardCheckboxes;
    }

    public renderItem(item: CartItem): void {
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
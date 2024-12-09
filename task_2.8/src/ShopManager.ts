class ShopManager {
    private _itemsManager: ItemsManager;
    private _cartManager: CartManager;
    private _cards: HTMLElement;

    constructor(itemsManager: ItemsManager, cartManager: CartManager) {
        this._itemsManager = itemsManager;
        this._cartManager = cartManager;
        this._cards = document.querySelector('.shop-cards') as HTMLElement;

        this._cards.addEventListener('click', (event) => {
            const button = event.target as HTMLElement;
            const card = button.parentElement as HTMLElement;
            this._itemsManager.toggleCartState(Number(card.dataset.id as string));
            this._cartManager.updateItems();
        });
    }

    public removeItems() {
        this._cards.innerHTML = '';
    }

    public updateItems() {
        const items = this._itemsManager.getItems();

        this.removeItems();

        items.forEach((item) => {
            let isInCart: string = '';
            if (item.isInCart) isInCart = 'checked';

            this._cards.innerHTML += `
                <div class="shop__card" data-id="${item.id}">
                    <input type="checkbox" class="add-card__checkbox" ${isInCart}>
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

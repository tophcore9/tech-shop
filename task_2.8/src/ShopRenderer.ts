class ShopRenderer {
    private _itemsManager: ItemsManager;
    private _cartManager: CartManager;

    private _shopCards: HTMLElement;
    private _cards: HTMLCollectionOf<HTMLElement>;
    private _topics: HTMLCollectionOf<HTMLInputElement>;

    constructor(itemsManager: ItemsManager, cartManager: CartManager) {
        this._itemsManager = itemsManager;
        this._cartManager = cartManager;

        this._shopCards = document.querySelector('.shop-cards') as HTMLElement;
        this._cards = document.getElementsByClassName('shop__card') as HTMLCollectionOf<HTMLElement>;

        this._topics = document.getElementsByClassName('topic-item__radio') as HTMLCollectionOf<HTMLInputElement>;

        this.renderAllItems();

        [...this._cards].forEach((card) => {
            card.addEventListener('click', (event) => {
                const currentCheckbox = event.target as HTMLInputElement;
                const currentCard = event.currentTarget as HTMLElement;
                const currentCardId = Number(currentCard.dataset.id as string);

                if (currentCheckbox.checked) {
                    this._cartManager.addItemToCart(this._itemsManager.findItem(currentCardId) as Item);
                } else {
                    this._cartManager.removeItemFromCart(currentCardId);
                }
            });
        });

        [...this._topics].forEach((topic) => {
            topic.addEventListener('click', () => {
                if (topic.value != 'All') this.showFilteredItems(topic.value);
                else this.showAllItems();
            });
        });
    }

    public removeAllItems() {
        this._shopCards.innerHTML = '';
    }

    public hideAllItems() {
        [...this._cards].forEach((card) => {
            card.classList.add('shop__card-hidden');
        });
    }

    public showAllItems() {
        [...this._cards].forEach((card) => {
            card.classList.remove('shop__card-hidden');
        });
    }

    public showFilteredItems(filterName: string) {
        this.hideAllItems();
        console.log(this._cards);
        [...this._cards].forEach((item) => {
            if (this._itemsManager.findItem(Number(item.dataset.id as string))?.category == filterName)
                item.classList.remove('shop__card-hidden');
        });
    }

    public renderAllItems() {
        this.removeAllItems();
        this._itemsManager.getAllItems().forEach((item) => {
            let checked = '';
            if (this._cartManager.findItem(item.id) != null) checked = 'checked';

            this._shopCards.innerHTML += `
                <div class="shop__card" data-id="${item.id}">
                    <input type="checkbox" class="add-card__checkbox" ${checked}>
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

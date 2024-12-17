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
    private _shopItemsRenderer: ShopItemsRenderer;
    private _cartItemsRenderer: CartItemsRenderer;
    private _shopFiltrator: ShopFiltrator;
    private _topics: HTMLCollectionOf<HTMLInputElement>;
    private _currentTopic: HTMLInputElement;

    private _priceRange: HTMLInputElement;
    private _priceValue: HTMLElement;

    private _searchInput: HTMLInputElement;
    private _searchButton: HTMLButtonElement;

    private _cardCheckboxes: HTMLCollectionOf<HTMLInputElement>;

    constructor(shopItemsRenderer: ShopItemsRenderer, cartItemsRenderer: CartItemsRenderer) {
        this._shopItemsRenderer = shopItemsRenderer;
        this._cartItemsRenderer = cartItemsRenderer;
        this._shopFiltrator = new ShopFiltrator(this._shopItemsRenderer.manager.items);

        this._topics = this._topics = document.getElementsByClassName(
            'topic-item__radio',
        ) as HTMLCollectionOf<HTMLInputElement>;
        this._currentTopic = document.querySelector('.topics__item') as HTMLInputElement;

        this._priceRange = document.querySelector('.price__range') as HTMLInputElement;
        this._priceValue = document.querySelector('.price__value') as HTMLElement;

        this._cardCheckboxes = this._shopItemsRenderer.wrapperClass.getElementsByClassName(
            'add-card__checkbox',
        ) as HTMLCollectionOf<HTMLInputElement>;

        this._searchInput = document.querySelector('.search__input') as HTMLInputElement;
        this._searchButton = document.querySelector('.search__button') as HTMLButtonElement;
        this._searchButton.addEventListener('click', () => {
            let filteredItems: Item[] = [];

            if (this._currentTopic.value == '') {
                this._shopItemsRenderer.updateRender();
            } else if (this._currentTopic.value == 'All') {
                filteredItems = this._shopFiltrator.filterByName(this._searchInput.value);
                this._shopItemsRenderer.updateCustomRender(filteredItems);
            } else {
                filteredItems = this._shopFiltrator.filterByNameAndCategory(
                    this._searchInput.value,
                    this._currentTopic.value,
                );
                this._shopItemsRenderer.updateCustomRender(filteredItems);
            }
        });
        window.addEventListener('keypress', (event) => {
            if (event.key == 'Enter') this._searchButton.click();
        });

        this._shopItemsRenderer.renderItems();
        this.setCheckboxes();

        document.querySelector('.cart-menu__close')?.addEventListener('click', this.setCheckboxes.bind(this));

        this._shopItemsRenderer.wrapperClass.addEventListener('click', (event) => {
            const target = event.target as HTMLInputElement;

            if (target.className == 'add-card__checkbox') {
                const currentItem = event.target as HTMLElement;
                const parentItem = currentItem.parentElement as HTMLElement;
                const currentItemId = Number(parentItem.dataset.id);
                const itemById = this._shopItemsRenderer.manager.findItem(currentItemId);

                if (target.checked) {
                    this._cartItemsRenderer.manager.addItem(itemById as CartItem);
                } else {
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

        document.querySelector('.price__range')?.addEventListener('input', () => {
            this._priceValue.innerHTML = 'Value: $' + this._priceRange.value;
        });

        document.querySelector('.price__range')?.addEventListener('change', () => {
            let filteredItems: Item[] = [];

            if (this._currentTopic.value != 'All') {
                filteredItems = this._shopFiltrator.filterByPriceAndCategory(
                    Number(this._priceRange.value),
                    this._currentTopic.value,
                );
            } else {
                filteredItems = this._shopFiltrator.filterByPrice(Number(this._priceRange.value));
            }

            this._shopItemsRenderer.updateCustomRender(filteredItems);
            this.setCheckboxes();
        });
    }

    public setCheckboxes() {
        [...this._cardCheckboxes].forEach((checkbox) => {
            const parent = checkbox.parentElement;
            const parentId = Number(parent?.dataset.id as string);

            if (this._cartItemsRenderer.manager.findItem(parentId)) checkbox.checked = true;
            else checkbox.checked = false;
        });
    }
}

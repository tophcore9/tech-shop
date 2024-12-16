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

    constructor(shopItemsRenderer: ShopItemsRenderer, cartItemsRenderer: CartItemsRenderer) {
        this._shopItemsRenderer = shopItemsRenderer;
        this._cartItemsRenderer = cartItemsRenderer;
        this._shopFiltrator = new ShopFiltrator(this._shopItemsRenderer.manager.items);

        this._topics = document.getElementsByClassName('topic-item__radio') as HTMLCollectionOf<HTMLInputElement>;

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

    public setCheckboxes() {
        [...this._shopItemsRenderer.checkboxes].forEach((checkbox) => {
            const parent = checkbox.parentElement;
            const parentId = Number(parent?.dataset.id as string);

            if (this._cartItemsRenderer.manager.findItem(parentId)) checkbox.checked = true;
            else checkbox.checked = false;
        });
    }
}

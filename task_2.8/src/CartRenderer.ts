class CartRenderer {
    private _cartManager: CartManager;

    private _navCartMenu: HTMLElement;
    private _cartMenu: HTMLElement;
    private _cartMenuClose: HTMLButtonElement;
    private _totalPrice: HTMLElement;
    private _cartItemsWrapper: HTMLElement;

    constructor() {
        this._cartManager = new CartManager();

        this._cartMenu = document.querySelector('.cart-menu') as HTMLElement;
        this._navCartMenu = document.querySelector('.nav-cart') as HTMLElement;
        this._cartMenuClose = document.querySelector('.cart-menu__close') as HTMLButtonElement;
        this._totalPrice = document.querySelector('.total-price') as HTMLElement;
        this._cartItemsWrapper = document.querySelector('.cart-menu__items') as HTMLElement;

        this._navCartMenu.addEventListener('click', this.showMenuCart.bind(this));
        this._cartMenuClose.addEventListener('click', this.hideMenuCart.bind(this));
        
        this.updateCartItemsRender();
    }
    
    public getCardManager(): CartManager {
        return this._cartManager;
    }

    /* Showing a menu cart by adding an according class */
    public showMenuCart() {
        this._cartMenu.classList.add('show-cart-menu');
    }

    /* Hiding a menu cart by removing an according class */
    public hideMenuCart() {
        this._cartMenu.classList.remove('show-cart-menu');
    }
    
    public removeRenderedCartItems() {
        this._cartItemsWrapper.innerHTML = '';
    }

    public updateCartItemsRender() {
        this.removeRenderedCartItems();
        this._cartManager.getAllCartItems().forEach((cartItem) => {
            this._cartItemsWrapper.innerHTML += `
                <div class="cart-menu__item" data-id="${cartItem.id}">
                    <div class="cart-item__left">
                        <img class="cart-item__picture" src="${cartItem.imageUrl}" alt="">
                        <div class="cart-item__info">
                            <div class="cart-item__name">${cartItem.name}</div>
                            <div class="cart-item__price">$${cartItem.price}</div>
                        </div>
                    </div>
                    <div class="cart-item__right">
                        <div class="cart-item__control">
                            <button class="cart-item__minus quantity-button">−</button>
                            <div class="cart-item__quantity">${cartItem.count}</div>
                            <button class="cart-item__plus quantity-button">+</button>
                        </div>
                        <button class="cart-item__remove-button">Remove</button>
                    </div>
                </div>
            `;
        });

        this._totalPrice.innerHTML = '$' + this._cartManager.getTotalValue();
    }
}
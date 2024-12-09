class CartManager {
    private _navCart: HTMLButtonElement;
    private _asideCart: HTMLElement;
    private _closeCartButton: HTMLButtonElement;

    constructor() {
        this._navCart = document.querySelector('.nav-cart') as HTMLButtonElement;
        this._asideCart = document.querySelector('.cart-menu') as HTMLElement;
        this._closeCartButton = document.querySelector('.cart-menu__close') as HTMLButtonElement;
        
        this._navCart.addEventListener('click', this.showCartMenu.bind(this));
        this._closeCartButton.addEventListener('click', this.hideCartMenu.bind(this));
    }
    
    private showCartMenu() {
        this._asideCart.classList.add('show-cart-menu');
    }
    
    private hideCartMenu() {
        this._asideCart.classList.remove('show-cart-menu');
    }
}
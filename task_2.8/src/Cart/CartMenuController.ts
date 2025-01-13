// ShopItemsManager
//                  \
//                    ShopItemsRenderer
//                                     \
//                                       ShopController
//                                     /
//                    CartItemsRenderer
//                  /                  \
// CartItemsManager                      CartMenuController <--

class CartMenuController {
    private _cartItemsRenderer: CartItemsRenderer;

    private _cartMenu: HTMLElement;
    private _navMenu: HTMLElement;
    private _openNavButton: HTMLButtonElement;
    private _closeNavButton: HTMLButtonElement;
    private _openCartButton: HTMLButtonElement;
    private _closeCartButton: HTMLButtonElement;

    constructor(cartItemsRenderer: CartItemsRenderer) {
        this._cartItemsRenderer = cartItemsRenderer;
        this._cartItemsRenderer.updateRender();

        this._cartMenu = document.querySelector('.cart-menu') as HTMLElement;
        this._openCartButton = document.querySelector('.nav-cart') as HTMLButtonElement;
        this._openCartButton.addEventListener('click', this.showCart.bind(this));
        this._closeCartButton = this._cartMenu.querySelector('.cart-menu__close') as HTMLButtonElement;
        this._closeCartButton.addEventListener('click', this.hideCart.bind(this));
        
        this._navMenu = document.querySelector('.nav') as HTMLElement;
        this._openNavButton = this._navMenu.querySelector('.nav-more') as HTMLButtonElement;
        this._openNavButton.addEventListener('click', this.showNav.bind(this));
        this._closeNavButton = this._navMenu.querySelector('.close-nav-more') as HTMLButtonElement;
        this._closeNavButton.addEventListener('click', this.hideNav.bind(this));

        this._cartItemsRenderer.wrapperClass.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const targetItem = target.closest('.cart-menu__item') as HTMLElement;
            const targetItemId = this.getElementId(targetItem);
            const quantityField = targetItem.querySelector('.cart-item__quantity') as HTMLElement;

            if (this.isTargetButton(targetItem, target, 'cart-item__minus')) {
                quantityField.innerHTML = this.handleDecrease(targetItemId).toString();
            } else if (this.isTargetButton(targetItem, target, 'cart-item__plus')) {
                quantityField.innerHTML = this.handleIncrease(targetItemId).toString();
            } else if (this.isTargetButton(targetItem, target, 'cart-item__remove-button')) {
                this.handleRemove(targetItemId);
            }

            this._cartItemsRenderer.updateRender();
        });
    }

    private handleIncrease(itemId: number): number {
        const afterIncrease = this._cartItemsRenderer.manager.increaseItemCount(itemId);
        return afterIncrease;
    }

    private handleDecrease(itemId: number): number {
        const afterDecrease = this._cartItemsRenderer.manager.decreaseItemCount(itemId);
        return afterDecrease;
    }

    private handleRemove(itemId: number) {
        this._cartItemsRenderer.manager.removeItem(itemId);
    }

    private isTargetButton(rootElement: HTMLElement, target: HTMLElement, className: string): boolean {
        if (target == rootElement.querySelector('.' + className)) return true;

        return false;
    }

    private getElementId(element: HTMLElement): number {
        return Number(element.dataset.id);
    }

    public showCart() {
        this.hideNav();
        this._cartMenu.classList.add('show-cart-menu');
    }

    public hideCart() {
        this._cartMenu.classList.remove('show-cart-menu');
    }
    
    public showNav() {
        this.hideCart();
        this._navMenu.classList.add('nav-shown');
        this.hideNavControls();
    }
    
    public hideNav() {
        this._navMenu.classList.remove('nav-shown');
        this.showNavControls();
    }
    
    public hideNavControls() {
        this._openCartButton.style.display = 'none';
        this._openNavButton.style.display = 'none';
    }

    public showNavControls() {
        this._openCartButton.style.display = 'block';
        this._openNavButton.style.display = 'block';
    }
}

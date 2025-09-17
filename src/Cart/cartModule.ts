const cartItemsManager = new CartItemsManager();
const cartItemsRenderer = new CartItemsRenderer('cart-menu__items', cartItemsManager);
const cartMenuController = new CartMenuController(cartItemsRenderer);

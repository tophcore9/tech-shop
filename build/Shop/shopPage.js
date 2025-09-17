"use strict";
const shopItemsManager = new ShopItemsManager();
shopItemsManager.loadItemsFromJson().then(() => {
    const shopItemsRenderer = new ShopItemsRenderer('shop-cards', shopItemsManager);
    const shopController = new ShopController(shopItemsRenderer, cartItemsRenderer);
});

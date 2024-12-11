(async () => {
    const shopItemsManager = new ShopItemsManager();
    await shopItemsManager.loadItemsFromJson();
    const shopItemsRenderer = new ShopItemsRenderer('shop-cards', shopItemsManager);

    const shopController = new ShopController(shopItemsRenderer, cartItemsRenderer);
})();
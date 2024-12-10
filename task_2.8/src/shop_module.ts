(async() => {
    const itemsManager = new ItemsManager();
    await itemsManager.loadItemsFromJson();

    const shopRenderer = new ShopRenderer(itemsManager, cartManager);
})();
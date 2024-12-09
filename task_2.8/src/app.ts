const itemsManager = new ItemsManager();
const cartManager = new CartManager(itemsManager);
cartManager.updateItems();
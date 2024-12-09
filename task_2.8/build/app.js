"use strict";
const itemsManager = new ItemsManager();
const cartManager = new CartManager(itemsManager);
const shopManager = new ShopManager(itemsManager, cartManager);
cartManager.updateItems();
shopManager.updateItems();

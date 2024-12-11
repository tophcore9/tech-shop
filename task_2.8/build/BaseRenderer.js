"use strict";
class BaseRenderer {
    constructor(wrapperClassName, manager) {
        this._wrapperClass = document.querySelector('.' + wrapperClassName);
        this._manager = manager;
    }
    /* Render all the items in the collection */
    renderItems() {
        this._manager.items.forEach((item) => {
            this.renderItem(item);
        });
    }
    /* Remove already existed render */
    removeRender() {
        this._wrapperClass.innerHTML = '';
    }
    /* Add item into the collection */
    addItem(item) {
        this._manager.addItem(item);
    }
    /* Remove item from the collection */
    removeItem(itemId) {
        this._manager.removeItem(itemId);
    }
}

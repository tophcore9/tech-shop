"use strict";
class BaseItemsRenderer {
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
    updateRender() {
        this.removeRender();
        this.renderItems();
    }
    get manager() {
        return this._manager;
    }
}

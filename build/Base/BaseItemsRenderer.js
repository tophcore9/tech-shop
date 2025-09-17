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
    renderCustomItems(items) {
        items.forEach((item) => {
            this.renderItem(item);
        });
    }
    /* Remove already existed render */
    removeRender() {
        this._wrapperClass.innerHTML = '';
    }
    /* Removing all render and updating it then */
    updateRender() {
        this.removeRender();
        this.renderItems();
    }
    /* Render custom collection of items in other sequence */
    updateCustomRender(items) {
        this.removeRender();
        this.renderCustomItems(items);
    }
    findHTMLElements(className, rootElement = this._wrapperClass) {
        return rootElement.getElementsByClassName(className);
    }
    findHTMLElement(className, rootElement = this._wrapperClass) {
        return rootElement.querySelector('.' + className);
    }
    /* Get manager */
    get manager() {
        return this._manager;
    }
    /* Get wrapper class in HTML for the items */
    get wrapperClass() {
        return this._wrapperClass;
    }
}

abstract class BaseItemsRenderer<TItem extends Item, TManager extends BaseItemsManager<TItem>> {
    protected _manager: TManager;
    protected _wrapperClass: HTMLElement;

    constructor(wrapperClassName: string, manager: TManager) {
        this._wrapperClass = document.querySelector('.' + wrapperClassName) as HTMLElement;
        this._manager = manager;
    }

    /* Render an exact item in the collection */
    public abstract renderItem(item: TItem): void;

    /* Render all the items in the collection */
    public renderItems() {
        this._manager.items.forEach((item) => {
            this.renderItem(item);
        });
    }

    public renderCustomItems(items: TItem[]) {
        items.forEach((item) => {
            this.renderItem(item);
        });
    }

    /* Remove already existed render */
    public removeRender() {
        this._wrapperClass.innerHTML = '';
    }

    /* Removing all render and updating it then */
    public updateRender() {
        this.removeRender();
        this.renderItems();
    }

    /* Render custom collection of items in other sequence */
    public updateCustomRender(items: TItem[]) {
        this.removeRender();
        this.renderCustomItems(items);
    }

    public findHTMLElements(className: string, rootElement: HTMLElement | Document = this._wrapperClass): HTMLCollectionOf<HTMLElement> {
        return rootElement.getElementsByClassName(className) as HTMLCollectionOf<HTMLElement>;
    }
    
    public findHTMLElement(className: string, rootElement: HTMLElement | Document = this._wrapperClass): HTMLElement {
        return rootElement.querySelector('.' + className) as HTMLElement;
    }

    /* Get manager */
    public get manager(): TManager {
        return this._manager;
    }

    /* Get wrapper class in HTML for the items */
    public get wrapperClass(): HTMLElement {
        return this._wrapperClass;
    }
}

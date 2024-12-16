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

    public updateRender() {
        this.removeRender();
        this.renderItems();
    }

    public updateCustomRender(items: TItem[]) {
        this.removeRender();
        this.renderCustomItems(items);
    }

    public get manager(): TManager {
        return this._manager;
    }

    public get wrapperClass(): HTMLElement {
        return this._wrapperClass;
    }
}

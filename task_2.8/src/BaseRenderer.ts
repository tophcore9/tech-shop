abstract class BaseRenderer<TItem extends Item, TManager extends BaseManager<TItem>> {
    private _manager: TManager;
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
        })
    }

    /* Remove already existed render */
    public removeRender() {
        this._wrapperClass.innerHTML = '';
    }
    
    /* Add item into the collection */
    public addItem(item: TItem) {
        this._manager.addItem(item);
    }
    
    /* Remove item from the collection */
    public removeItem(itemId: number) {
        this._manager.removeItem(itemId);
    }
}
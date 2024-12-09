interface Item {
    name: string;
    price: number;
    imageUrl: string;
    ratingStars: number;
    category: string;
    isInCart: boolean;
}

class ItemsManager {
    private _items: Item[];

    constructor() {
        this._items = [
            {
                name: 'Aula F3032',
                price: 30,
                imageUrl: 'https://brain.com.ua/static/images/prod_img/1/3/U0826113_big.jpg',
                ratingStars: 3,
                category: 'Keyboards',
                isInCart: false,
            },
            {
                name: 'Acer TravelMate P4',
                price: 450,
                imageUrl: 'https://brain.com.ua/static/images/prod_img/8/7/U0964387_big_1727105206.jpg',
                ratingStars: 4,
                category: 'Laptops',
                isInCart: false,
            },
            // {
            //     name: 'Samsung Galaxy S24 Ultra',
            //     price: 1500,
            //     imageUrl: 'https://brain.com.ua/static/images/prod_img/3/9/U0893139_3big_1705555238.jpg',
            //     ratingStars: 4,
            //     category: 'Smartphones',
            //     isInCart: true,
            // },
            {
                name: 'ASUS Vivobook 15',
                price: 550,
                imageUrl: 'https://brain.com.ua/static/images/prod_img/2/3/U0955123_big_1723656091.jpg',
                ratingStars: 5,
                category: 'Laptops',
                isInCart: false,
            },
            {
                name: 'Apple Watch Series 10',
                price: 500,
                imageUrl: 'https://brain.com.ua/static/images/prod_img/3/0/U0961730_big_1726061269.jpg',
                ratingStars: 5,
                category: 'Watches',
                isInCart: false,
            },
        ];
    }

    public getItems(): Item[] {
        return this._items;
    }
}

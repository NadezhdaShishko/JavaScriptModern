class ItemsList {
    constructor() {
        this.items = [];
    }

    getItems() {
        this.items = [
            { name: 'Shirt', image: 'images/product1.jpg', price: 150 },
            { name: 'Socks', image: 'images/product2.jpg', price: 50 },
            { name: 'Jacket', image: 'images/product3.jpg', price: 350 },
            { name: 'Shoes', image: 'images/product4.jpg', price: 250 },
            { name: 'Shirt', image: 'images/product5.jpg', price: 150 },
            { name: 'Socks', image: 'images/product6.jpg', price: 50 },
            { name: 'Jacket', image: 'images/product7.jpg', price: 350 },
            { name: 'Shoes', image: 'images/product8.jpg', price: 250 },
        ];
    }

    total() {
        return this.items.reduce((acc, item) => acc + item.price, 0);
    }

    render() {
        const itemsHtml = this.items.map(item => (new Item(item.image, item.name, item.price)).render());

        return itemsHtml.join('');
    }
}

class Item {
    constructor(image, name, price) {
        this.image = image;
        this.name = name;
        this.price = price;
    }

    render() {
        return `<div class="goodsItem">
                    <div class="productUnitImgWrap">
                        <div class="productUnitBuy">
                            <button><img src="images/addToCart.png" alt="">Add to Cart</button>
                        </div>
                        <img src="${this.image}" alt=""/>
                    </div>
                    <h3>${this.name}</h3><span>$${this.price}</span>
                </div>`;
    }
}

const items = new ItemsList();
items.getItems();
alert(items.total());

document.querySelector('.goodsList').innerHTML = items.render();
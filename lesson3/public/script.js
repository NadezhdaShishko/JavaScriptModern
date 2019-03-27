function sendRequest(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE) {
                if(xhr.status === 200) {
                    resolve (JSON.parse(xhr.responseText));
                } else {
                    reject();
                }
            }
        }
    });
}

class ItemsList {
    constructor() {
        this.items = [];
    }
    
    getItems() {
        return sendRequest('http://localhost:3000/goods.json').then((goods) => {
            this.items = goods.map(item => new Item(item.image, item.name, item.price));
            return this.items;
        })
    };

    total() {
        return this.items.reduce((acc, item) => acc + item.price, 0);
    }

    render() {
        const itemsHtml = this.items.map(item => item.render());

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
items.getItems().then(() => {
    document.querySelector('.goodsList').innerHTML = items.render();
});

const $cartButton = document.querySelector('#cartButton');
$cartButton.addEventListener('click', () => {
    sendRequest('http://localhost:3000/cart.json').then(products => {
        document.querySelector('#cartList').innerHTML = products.map(item => 
            `<li><img src="${item.image}" alt=""/>
                <h3>${item.name}</h3>
                <span>$${item.price}</span>
                <span>${item.quantity}</span>
                <span>$${item.subtotal}</span>
            </li>`).join('');
    });
});
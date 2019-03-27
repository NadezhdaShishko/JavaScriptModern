function sendRequest(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE) {
            callback (JSON.parse(xhr.responseText))
        }
    }
}
// с промисами до конца не сраслось
/* 
function sendRequest(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE) {
                resolve (JSON.parse(xhr.responseText));
            }
        };
    });
}
*/
class ItemsList {
    constructor() {
        this.items = [];
    }

    getItems(callback) {
        sendRequest('http://localhost:3000/goods.json', (goods) => {
            this.items = goods.map(item => new Item(item.image, item.name, item.price));
            callback();
        });
    }
    /*
    getItems(resolve) {
        sendRequest('http://localhost:3000/goods.json')
            .then(
                (goods) => {
                    this.items = goods.map(item => new Item(item.image, item.name, item.price));
                },
                () => {},
            )
    };
    */

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
items.getItems(() => {
    document.querySelector('.goodsList').innerHTML = items.render();
});

const $cartButton = document.querySelector('#cartButton');
$cartButton.addEventListener('click', (callback) => {
    sendRequest('http://localhost:3000/cart.json', (cart) => {
        document.querySelector('#cartList').innerHTML = cart.map(item => 
            `<li><img src="${item.image}" alt=""/>
                <h3>${item.name}</h3>
                <span>$${item.price}</span>
                <span>${item.quantity}</span>
                <span>$${item.subtotal}</span>
            </li>`).join('');
            callback();
    });
});
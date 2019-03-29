function sendRequest(url) {
    return fetch(url).then((response) => response.json());
}

class ItemsList {
    constructor() {
        this.items = [];
    }
    
    getItems() {
        return sendRequest('http://localhost:3000/goods.json').then((goods) => {
            this.items = goods.map(item => new Item(item.image, item.name, item.price));
            this.filteredItems = this.items;
            return this.items;
        })
    };

    filterItems(query) {
        const regexp = new RegExp(query, 'i');
        this.filteredItems = this.items.filter((item) => regexp.test(item.name))
    }

    total() {
        return this.items.reduce((acc, item) => acc + item.price, 0);
    }

    render() {
        const itemsHtml = this.filteredItems.map(item => item.render());

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
                            <button id="goodBtn"><img src="images/addToCart.png" alt="">Add to Cart</button>
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

const $search = document.querySelector('#search');
const $searchQuery = document.querySelector('#searchQuery');

$search.addEventListener('click', () => {
    const query = $searchQuery.value;
    items.filterItems(query);
    document.querySelector('.goodsList').innerHTML = items.render();
});

const $cartList = document.querySelector('#cartList');

fetch('http://localhost:3000/goods')
.then((response) => response.json())
.then((goods) => {
    $cartList.innerHTML = goods.map((item) => 
    `<li><img src="${item.image}" alt=""/>
        <h3>${item.name}</h3>
        <span>$${item.price}</span>
        <span>${item.quantity}</span>
        <span>$${item.subtotal}</span>
    </li>`).join('');
});

// $goodsList = document.querySelector('#goodsList');
// $goodsList.addEventListener('click', (event) => {
//     if (event.target.tagName === 'goodBtn') {}
// })
// const $cartButton = document.querySelector('#cartButton');
// $cartButton.addEventListener('click', () => {
//     sendRequest('http://localhost:3000/goods').then(products => {
//         document.querySelector('#cartList').innerHTML = products.map(item => 
//             `<li><img src="${item.image}" alt=""/>
//                 <h3>${item.name}</h3>
//                 <span>$${item.price}</span>
//                 <span>${item.quantity}</span>
//                 <span>$${item.subtotal}</span>
//             </li>`).join('');
//     });
// });
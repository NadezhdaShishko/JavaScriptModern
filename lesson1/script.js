const items = [
    { name: 'Shirt', image: 'images/product1.jpg', price: 150 },
    { name: 'Socks', image: 'images/product2.jpg', price: 50 },
    { name: 'Jacket', image: 'images/product3.jpg', price: 350 },
    { name: 'Shoes', image: 'images/product4.jpg', price: 250 },
    { name: 'Shirt', image: 'images/product5.jpg', price: 150 },
    { name: 'Socks', image: 'images/product6.jpg', price: 50 },
    { name: 'Jacket', image: 'images/product7.jpg', price: 350 },
    { name: 'Shoes', image: 'images/product8.jpg', price: 250 },
  ];
  
const renderItem = ({ image, name, price = 50 }) => 
    `<div class="goodsItem">
        <div class="productUnitImgWrap">
            <div class="productUnitBuy">
                <button><img src="images/addToCart.png" alt="">Add to Cart</button>
            </div>
            <img src="${image}" alt=""/>
        </div>
        <h3>${name}</h3><span>$${price}</span>
    </div>`;

const renderList = (items) => {
    const itemsHtml = items.map(renderItem);

    document.querySelector('.goodsList').innerHTML = itemsHtml.join('');
}

renderList(items);
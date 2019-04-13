const API_URL = 'http://localhost:3000';

Vue.component('product-item', {
    props: ['item'],
    template: `
        <div>
            <div class="productUnitImgWrap">
                <div class="productUnitBuy">
                    <button id="addCartBtn" @click="handleBuyClick(item)"><img src="images/addToCart.png" alt="">Add to Cart</button>
                </div>
                <img :src="item.image" alt="img"/>
            </div>
            <h3>{{ item.name }}</h3><span>&#36 {{ item.price }}</span>
        </div>
    `,
    methods: {
        handleBuyClick(item) {
            this.$emit('onBuy', item);
        }
    }
});

Vue.component('products', {
    props: ['query'],
    template: `
        <div>
            <div class="goodsList" v-if="filteredItems.length">
                <div class="goodsItem" v-for="item in filteredItems">
                    <product-item @onBuy="handleBuyClick" :item="item"><product-item>
                </div>
            </div>
            <div v-if="!filteredItems.length" class="empty">Ничего не найдено</div>
        </div>    
    `,
    data() {
        return {
            items: [],
        }
    },
    methods: {
        handleBuyClick(item) {
            this.$emit('onbuy', item);
        }
    },
    computed: {
        filteredItems() {
            const regexp = new RegExp(this.query, 'i');
            return this.items.filter((item) => regexp.test(item.name))
        },
    },
    mounted() {
        fetch(`${API_URL}/goods`)
        .then((response) => response.json())
        .then((items) => {
            this.items = items;
        });
    }
});

Vue.component('search', {
    template: `
        <div>
            <input type="text" v-model="searchQuery" class="searchQuery" placeholder="Поиск по названию товара" />
            <button id="search" @click="hendleSearchClick">Поиск</button>
        </div>
    `,
    data() {
        return {
            searchQuery: '',
        };
    },
    methods: {
        hendleSearchClick() {
            this.$emit('onsearch', this.searchQuery);
        }
    }
});

Vue.component('cart', {
    props: ['cart', 'total'],
    template:`
        <div>
            <h3 class="total" v-if="cart.length">В корзине товара на сумму:<span> {{ total }} $</span>.</h3>
            <h3 class="total" v-if="!cart.length">Корзина пуста.</h3>
            <ul id="cartList" v-if="cart.length">
                <li v-for="item in cart">
                <img :src="item.image" alt="img"/>
                <h3>{{ item.name }}</h3>
                <span>&#36{{ item.price }}</span>
                <span>{{ item.quantity }}</span>
                <span>&#36{{ item.subtotal = item.price * item.quantity }}</span>
                <button class="action" @click="handleDeleteClick(item)"><i class="fas fa-times-circle"></i></button>
                </li>
            </ul>
        </div>
    `,
    methods: {
        handleDeleteClick(item) {
            this.$emit('ondelete', item);
        }
    }
});

const app = new Vue({
    el: '#app',
    data: {
        cart: [],
        searchQuery: '',
        total: 0,
    },
    mounted() {
        fetch(`${API_URL}/cart`)
            .then((response) => response.json())
            .then((result) => {
                this.cart = result.items;
                this.total = result.total;
            });
    },
    methods: {
        handleSearch(query) {
            this.searchQuery = query;
        },
        handleDeleteClick(item) {
            if(item.quantity > 1) {
                fetch(`${API_URL}/cart/${item.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({quantity: item.quantity - 1})
                }).then((response) => response.json())
                  .then((result) => {
                    const itemIdx = this.cart.findIndex(cartItem => cartItem.id === item.id);
                    Vue.set(this.cart, itemIdx, result.item);
                    this.total = result.total;
                });
            } else {
                fetch(`${API_URL}/cart/${item.id}`, {
                    method: 'DELETE',
                }).then((response) => response.json())
                  .then((result)=> {
                    this.cart = this.cart.filter((cartItem) => cartItem.id !== item.id);
                    this.total = result.total;
                });
            }
        },
        handleBuyClick(item) {
            const cartItem = this.cart.find(cartItem => cartItem.id === item.id);
            if(cartItem) {
                fetch(`${API_URL}/cart/${item.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({quantity: cartItem.quantity + 1})
                }).then((response) => response.json())
                  .then((result) => {
                    const itemIdx = this.cart.findIndex(cartItem => cartItem.id === item.id);
                    Vue.set(this.cart, itemIdx, result.item);
                    this.total = result.total;
                });
            } else {
                fetch(`${API_URL}/cart`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({...item, quantity: 1}),
                }).then((response) => response.json())
                    .then((result) => {
                    this.cart.push(result.item);
                    this.total = result.total;
                });
            }
        }
    }
});

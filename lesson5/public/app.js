const API_URL = 'http://localhost:3000';

const app = new Vue({
    el: '#app',
    data: {
        items: [],
        cart: [],
        searchQuery: '',
        display: 'none'
    },
    methods: {
        handleBuyClick(item) {
            const cartItem = this.cart.find(cartItem => cartItem.id === item.id);
            if(cartItem) {
                fetch(`${API_URL}/cart/${item.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({quantity: cartItem.quantity + 1})
                }).then((response) => response.json())
                  .then((updated) => {
                    const itemIdx = this.cart.findIndex(cartItem => cartItem.id === item.id);
                    Vue.set(this.cart, itemIdx, updated);
                });
            } else {
                fetch(`${API_URL}/cart`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({...item, quantity: 1}),
                }).then((response) => response.json())
                    .then((created) => {
                    this.cart.push(created);
                });
            }
        }
    },
    mounted() {
        fetch(`${API_URL}/goods`)
        .then((response) => response.json())
        .then((items) => {
            this.items = items;
            this.filteredItems = items;
            this.display = 'block';
        });
    },
    computed: {
        filteredItems() {
            const regexp = new RegExp(this.searchQuery, 'i');
            return this.items.filter((item) => regexp.test(item.name))
        },
        total() {
            return this.cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
        }
    }
});

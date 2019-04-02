const app = new Vue({
    el: '#app',
    data: {
        items: [],
        cart: [],
        searchQuery: '',
        display: 'none',
        quantity: 0,
        putInCart: 0
    },
    methods: {
        putInCart: function(event) {
            if (event.target.tagName === 'BUTTON') {
                fetch('http://localhost:3000/cart', {
                    method: 'POST',
                    body: JSON.stringify(item),
                }).then((cart) => {
                    this.cart.push({item
                    // image = this.image,
                    // name = this.name,
                    // price = this.price
                    });
                });
            } 
        },
        delFromCart: function(event) {
            // const id = event.target.dataset.id;
            fetch('http://localhost:3000/cart/${id}', {
                method: 'DELETE',
            }).then(() => {
                event.target.parentElement.removeChild(event.target);
            });   
        }
    },
    mounted() {
        fetch('http://localhost:3000/goods')
        .then((response) => response.json())
        .then((items) => {
            this.items = items;
            this.filteredItems = items;
            this.display = 'block';
        });

        fetch('http://localhost:3000/cart')
        .then((response) => response.json())
        .then((cart) => {
            this.cart = cart;
        });
    },
    computed: {
        filteredItems() {
            const regexp = new RegExp(this.searchQuery, 'i');
            return this.items.filter((item) => regexp.test(item.name))
        },
        total() {
            return this.cart.reduce((acc, product) => acc + product.subtotal, 0);
        }
    }
});

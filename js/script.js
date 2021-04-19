'use strict'

Vue.component('shop-catalog-item', {
  props: ['product_data'],
  template: '<div class="shop-catalog-item"><span class="shop-catalog-item-title">{{ product_data.title }}</span><span class="shop-catalog-item-price ">{{ product_data.price }} &#8381;</span><span class="shop-catalog-item-article ">{{ product_data.article }}</span><button class="shop-catalog-item-btn" @click="sendToCart">Добавить в корзину</button></div>',
  data: function() {
    return {}
  },
  methods: {
    sendToCart() {
      const uid = '_' + Math.random().toString(36).substr(2, 9);
      const product_data_for_cart = {
        title: this.product_data.title,
        price: this.product_data.price,
        article: this.product_data.article,
        uid: uid
      };
      this.$emit('send_data_to_cart', product_data_for_cart);
    },
  }
});

// ----------------

Vue.component('shop-cart-main', {
  props: ['cart_items'],
  template: '<div class="shop-cart-main"><p>{{ cart_items.title}} - {{ cart_items.price }} &#8381; [Артикул:{{ cart_items.article }}]</p><button class="shop-cart-del-btn" :data-uid=cart_items.uid @click="removeFromCart">Удалить</button></div>',
  data: function() {
    return {}
  },
  methods: {
    removeFromCart(e) {
      //console.log(e.currentTarget.getAttribute('data-uid'));
      const data_uid = e.currentTarget.getAttribute('data-uid');
      this.$emit('remove_data_from_cart', data_uid);
    }
  }
});

// ----------------

Vue.component('shop-cart-buy', {
  props: [''],
  template: '<div class="shop-cart-buy mleft">Оформить заказ</div>',
  data: function() {
    return {}
  }
});

// ----------------

const app = new Vue({
  el: '#app',
  data: {
    products: [],
    cart: [],
    total_cart_price: 0,

  },
  methods: {
    getProducts: function() {
      const promise = new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', './json/goods.json');
        xhr.responseType = 'text';
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.response)
            }
          };
        };
        xhr.send();
      });

      promise
        .then((response) => {
          this.products = JSON.parse(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addDataToCart: function(data) {
      this.cart.push(data);
      this.total_cart_price += data.price;
      console.log(this.cart);
    },
    removeDataFromCart: function(data) {
      let newCart = this.cart;
      const idx = newCart.findIndex(function(newCart) { return newCart.uid === data });
      this.total_cart_price -= this.cart[idx].price;
      this.cart.splice(idx, 1);
      console.log(this.cart);
    }
  }
});

// ----------------

app.getProducts();
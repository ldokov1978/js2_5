'use strict'

Vue.component('app-item', {
  props: ['goods'],
  template: '<div class="goods-item"><h2 class="goods-item-title">{{ goods.title }}</h2><span>{{ goods.price }}</span><app-button value="Добавить в корзину" /></div>'
});

Vue.component('app-button', {
  props: ['goods'],
  template: '<input class="app-button" type="button" />'
});

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
  },
  methods: {
    getGoods: function () {
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
          this.goods = JSON.parse(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  components: {}
});

app.getGoods ();
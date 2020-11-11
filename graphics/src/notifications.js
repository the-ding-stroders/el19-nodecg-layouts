import Vue from 'vue';
import VueAnime from 'vue-animejs';
import App from './Notifications.vue';

Vue.use(VueAnime);

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: (h) => h(App),
});

import Vue from 'vue'
import App from './LowerBar.vue'

import VueAnime from 'vue-animejs';

Vue.use(VueAnime)

new Vue({
  el: '#app',
  render: h => h(App)
})

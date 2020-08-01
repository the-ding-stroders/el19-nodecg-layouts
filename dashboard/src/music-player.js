import Vue from 'vue'
import vuetify from '../../extension/plugins/vuetify.js'
import App from './Music-player.vue'

new Vue({
  vuetify,
  el: '#app',
  render: h => h(App)
})

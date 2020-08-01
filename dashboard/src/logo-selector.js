import Vue from 'vue'
import vuetify from '../../extension/plugins/vuetify.js'
import App from './Logo-selector.vue'

new Vue({
  vuetify,
  el: '#app',
  render: h => h(App)
})

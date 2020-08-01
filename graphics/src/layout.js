import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue'
import vuetify from '../../extension/plugins/vuetify.js'
import App from './Layout.vue'

new Vue({
  vuetify,
  el: '#app',
  render: h => h(App)
})

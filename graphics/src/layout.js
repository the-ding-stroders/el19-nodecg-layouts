import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './Layout.vue'

Vue.use(Vuetify)

new Vue({
  el: '#app',
  render: h => h(App)
})

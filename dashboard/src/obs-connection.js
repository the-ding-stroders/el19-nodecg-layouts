import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './Obs-connection.vue'

Vue.use(Vuetify)

new Vue({
  el: '#app',
  render: h => h(App)
})

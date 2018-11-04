import Vue from 'vue'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import 'vuetify/dist/vuetify.min.css'
import App from './Schedule.vue'

Vue.use(Vuetify)
Vue.use(VueResource)

new Vue({
  el: '#app',
  render: h => h(App)
})

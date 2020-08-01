import Vue from 'vue'
import vuetify from '../../extension/plugins/vuetify.js'
import VueResource from 'vue-resource'
import App from './Schedule.vue'

Vue.use(VueResource)

new Vue({
  vuetify,
  el: '#app',
  render: h => h(App)
})

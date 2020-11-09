import Vue from 'vue';
import VueResource from 'vue-resource';
import vuetify from '../../extension/plugins/vuetify';
import App from './Schedule.vue';

Vue.use(VueResource);

new Vue({ // eslint-disable-line no-new
  vuetify,
  el: '#app',
  render: (h) => h(App),
});

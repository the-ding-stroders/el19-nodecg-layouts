import Vue from 'vue';
import vuetify from '../../extension/plugins/vuetify';
import App from './Logo-selector.vue';

new Vue({ // eslint-disable-line no-new
  vuetify,
  el: '#app',
  render: (h) => h(App),
});

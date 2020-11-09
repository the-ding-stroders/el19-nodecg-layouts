import Vue from 'vue';
import Vuex from 'vuex';
import vuetify from '../../extension/plugins/vuetify';
import App from './Donations.vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    donations: [],
  },
  mutations: {
    updateDonations(state, payload) {
      state.donations = payload;
    },
  },
  actions: {
    updateDonations(context) {
      const donationsRep = nodecg.Replicant('donations', 'nodecg-tiltify');
      NodeCG.waitForReplicants(donationsRep).then(() => {
        nodecg.readReplicant('donations', 'nodecg-tiltify', (donationsVal) => {
          context.commit('updateDonations', donationsVal);
        });
      });
    },
  },
});

new Vue({ // eslint-disable-line no-new
  vuetify,
  el: '#app',
  store,
  render: (h) => h(App),
});

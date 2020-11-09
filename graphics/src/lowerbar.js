import Vue from 'vue'
import Vuex from 'vuex'
import App from './LowerBar.vue'

import VueAnime from 'vue-animejs';

Vue.use(VueAnime)
Vue.use(Vuex)

Vue.filter('toCurrency', function (value) {
    if (typeof value !== "number") {
        return value;
    }
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    });
    return formatter.format(value);
});

const store = new Vuex.Store({
  state: {
    donations: []
  },
  mutations: {
    updateDonations (state, payload) {
      state.donations = payload
    }
  },
  actions: {
    updateDonations (context) {
      const donationsRep = nodecg.Replicant('donations')
      NodeCG.waitForReplicants(donationsRep).then(() => {
        nodecg.readReplicant('donations', donationsVal => {
          context.commit('updateDonations', donationsVal)
        })
      })
    }
  }
})

new Vue({
  el: '#app',
  store: store,
  render: h => h(App)
})

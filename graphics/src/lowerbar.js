import Vue from 'vue'
import Vuex from 'vuex'
import App from './LowerBar.vue'

import VueAnime from 'vue-animejs';

Vue.use(VueAnime)
Vue.use(Vuex)

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
      const donationsRep = nodecg.Replicant('donations', 'nodecg-tiltify')
      NodeCG.waitForReplicants(donationsRep).then(() => {
        nodecg.readReplicant('donations', 'nodecg-tiltify', donationsVal => {
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

<template>
  <div id="donation-list">
    <div class="donation-list-label">Recent Donations:</div>
    <DonationsListItem
      v-for="donation in donations"
      :key="donation.id"
      :donation="donation"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import DonationsListItem from './DonationsListItem.vue';

export default {
  components: {
    DonationsListItem
  },
  computed: {
      donations () {
          return this.$store.state.donations
      }
  },
  methods: {
      ...mapActions([
          'updateDonations'
      ])
  },
  mounted: function() {
    const vm = this;

    const donationsRep = nodecg.Replicant('donations', 'nodecg-tiltify')
    donationsRep.on('change', () => {
        this.updateDonations()
    })
  }
}
</script>

<style>
#donation-list {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  position: relative;
  line-height: 72px;
  height: 100%;
  margin-top: 4px;
  z-index: 10;
}
#donation-list .donation-list-label {
  display: inline-block;
  left: 32px;
  font-size: 26px;
  width: 180px;
}
</style>

<template>
  <div id="donation-list">
    <div class="donation-list-label">
      Recent Donations:
    </div>
    <DonationsListItem
      v-for="donation in donations"
      :key="donation.donationID"
      :donation="donation"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import DonationsListItem from './DonationsListItem.vue';

export default {
  components: {
    DonationsListItem,
  },
  data: () => ({
    donationsLimit: 6,
  }),
  computed: {
    donations() {
      return this.donationsLimit ? this.$store.state.donations.slice(0, this.donationsLimit) : this.$store.state.donations;
    },
  },
  mounted() {
    const donationsRep = nodecg.Replicant('donations');
    donationsRep.on('change', () => {
      this.updateDonations();
    });
  },
  methods: {
    ...mapActions([
      'updateDonations',
    ]),
  },
};
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
  z-index: 5;
  padding-left: 40px;
}
#donation-list .donation-list-label {
  display: inline-block;
  left: 32px;
  font-size: 26px;
  width: 180px;
}
</style>

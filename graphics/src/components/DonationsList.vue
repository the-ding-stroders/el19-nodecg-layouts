<template>
  <div id="donation-list">
    <div class="donation-list-label">Big Spenders:</div>
    <DonationsListItem
      v-for="donation in donations"
      :key="donation.id"
      :donation="donation"
    />
  </div>
</template>

<script>
import DonationsListItem from './DonationsListItem.vue';

export default {
  components: {
    DonationsListItem
  },
  data() {
    return {
      donations: []
    }
  },
  methods: {
    getTopDonations: function() {
      const vm = this;
      fetch('http://192.168.1.127:8000/donations/top')
        .then(r => r.json())
        .then(data => {
          vm.donations = data;
        })
        .catch(e => nodecg.log.info(e));
    }
  },
  mounted: function() {
    const vm = this;
    this.getTopDonations();
  }
}
</script>

<style>
#donation-list {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  position: relative;
}
#donation-list .donation-list-label {
  display: inline-block;
  position: absolute;
  left: 32px;
  line-height: 28px;
  font-size: 26px;
}
</style>

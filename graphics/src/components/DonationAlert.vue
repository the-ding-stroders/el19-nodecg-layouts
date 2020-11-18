<template>
  <div class="donation-alert">
    <div class="new-donation-text">
      <span>${{ currentDonation.amount }}</span>
      <span>from</span>
      <span>{{ currentDonation.displayName }}</span>
    </div>
    <div class="slash-bot-wrapper">
      <div class="slash-bot-animate">
        <div class="slash-bot" />
      </div>
    </div>
    <div class="slash-top-wrapper">
      <div class="slash-top-animate">
        <div class="slash-top" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DonationAlert',
  data: () => ({
    currentDonation: {},
    donationDisplayTime: null,
    donationsQueue: [],
    newDonations: false,
  }),
  watch: {
    donationsQueue(value) {
      // If items were added to the queue, set the newDonations to true, then...
      if (Array.isArray(value) && value.length > 0) {
        this.newDonations = true;
      }
    },
    newDonations(value) {
      // ...run the nextDonation function to start the animation timeline.
      const vm = this;

      if (value === true) {
        vm.nextDonation();
      }
    },
  },
  created() {
    const vm = this;
    nodecg.readReplicant('settings', (value) => {
      vm.donationDisplayTime = value.donationDisplayTime.value;
    });
  },
  mounted() {
    const vm = this;
    nodecg.listenFor('donationAlert', (results) => {
      const localDonations = JSON.parse(JSON.stringify(vm.donationsQueue));
      const incomingDonations = JSON.parse(JSON.stringify(results));
      // eslint-disable-next-line max-len
      const donationDiff = incomingDonations.filter((inc) => !localDonations.some((loc) => inc.donationID === loc.donationID));

      if (donationDiff.length > 0) {
        vm.donationsQueue = vm.donationsQueue.concat(donationDiff);
      }
    });
  },
  methods: {
    nextDonation() {
      const vm = this;

      // If the queue is empty, end the cycle.
      if (vm.donationsQueue.length === 0) {
        vm.newDonations = false;
        return;
      }

      // Grab the first item in the array and show it
      const newDonation = JSON.parse(JSON.stringify(vm.donationsQueue[0]));
      vm.showNewDonation(newDonation, () => {
        // Remove the item we just showed and call this function again
        vm.donationsQueue.shift();
        vm.nextDonation();
      });
    },
    showNewDonation(donation, callback) {
      const vm = this;
      const timeline = vm.$anime.timeline({
        begin() {
          vm.currentDonation = donation;
        },
        complete() {
          vm.currentDonation = {};
          callback();
        },
      })
        .add({
          targets: '.slash-bot-animate',
          skewX: {
            value: -25, delay: 0, duration: 25,
          },
          scaleX: {
            value: 170, delay: 25, elasticity: 0, duration: 250, easing: 'easeInExpo',
          },
        })
        .add({
          targets: '.slash-top-animate',
          skewX: {
            value: -25, delay: 0, duration: 25,
          },
          scaleX: {
            value: 170, delay: 25, elasticity: 0, duration: 250, easing: 'easeInCubic',
          },
        })
        .add({
          targets: '.new-donation-text',
          opacity: {
            value: 1,
            easing: 'linear',
            duration: 750,
          },
        })
        .add({
          targets: '.new-donation-text',
          opacity: {
            value: 0,
            easing: 'linear',
            duration: 250,
          },
        }, `+=${vm.donationDisplayTime}`)
        .add({
          targets: '.slash-top-animate',
          skewX: {
            value: -25, delay: 0, duration: 25,
          },
          scaleX: {
            value: 0, elasticity: 0, duration: 250, easing: 'easeInExpo',
          },
        })
        .add({
          targets: '.slash-bot-animate',
          skewX: {
            value: -25, delay: 0, duration: 25,
          },
          scaleX: {
            value: 0, elasticity: 0, duration: 250, easing: 'easeInCubic',
          },
        });

      timeline.finished.then();
    },
  },
};
</script>

<style scoped>
.slash-bot-wrapper {
  position: absolute;
  z-index: 6;
  margin-left: -60px;
}
.slash-bot-animate {
  position: relative;
  display: inline-block;
}
.slash-bot {
  background: #7D292A;
  height: 76px;
  width: 10px;
  margin-left: 10px;
}
.slash-top-wrapper {
  position: absolute;
  z-index: 7;
  margin-left: -60px;
}
.slash-top-animate {
  position: relative;
  display: inline-block;
}
.slash-top {
  background: #fff;
  height: 76px;
  width: 10px;
  margin-left: 10px;
}
.new-donation-text {
  position: absolute;
  margin: auto;
  z-index: 10;
  width: 100%;
  text-align: center;
  color: #000;
  font-size: 26px;
  line-height: 76px;
  opacity: 0;
}
</style>

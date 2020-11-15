<template>
  <div class="donation-alert">
    <div class="new-donation-text">
      <span>${{ donation.amount }}</span>
      <span>from</span>
      <span>{{ donation.displayName }}</span>
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
    donation: {},
  }),
  mounted() {
    const vm = this;
    nodecg.listenFor('donationAlert', (newDonations) => {
      const newDonation = newDonations[0];
      vm.donation = newDonation;
      vm.showNewDonation();
      setTimeout(() => {
        vm.hideNewDonation();
      }, 5000);
    });
  },
  methods: {
    showNewDonation() {
      const vm = this;
      vm.$anime.timeline()
        .add({
          targets: '.slash-bot-animate',
          skewX: {
            value: -25, delay: 0, duration: 50,
          },
          scaleX: {
            value: 170, delay: 25, elasticity: 0, duration: 500, easing: 'easeInExpo',
          },
          offset: 0,
        })
        .add({
          targets: '.slash-top-animate',
          skewX: {
            value: -25, delay: 0, duration: 50,
          },
          scaleX: {
            value: 170, delay: 25, elasticity: 0, duration: 500, easing: 'easeInCubic',
          },
        })
        .add({
          targets: '.new-donation-text',
          opacity: {
            value: 1,
            easing: 'linear',
            duration: 250,
          },
        });
    },
    hideNewDonation() {
      const vm = this;
      vm.$anime.timeline()
        .add({
          targets: '.new-donation-text',
          opacity: {
            value: 0,
            easing: 'linear',
            duration: 250,
          },
          offset: 0,
        })
        .add({
          targets: '.slash-top-animate',
          skewX: {
            value: -25, delay: 0, duration: 50,
          },
          scaleX: {
            value: 0, delay: 25, elasticity: 0, duration: 500, easing: 'easeInExpo',
          },
        })
        .add({
          targets: '.slash-bot-animate',
          skewX: {
            value: -25, delay: 0, duration: 50,
          },
          scaleX: {
            value: 0, delay: 25, elasticity: 0, duration: 500, easing: 'easeInCubic',
          },
        });
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

<template>
  <div class="donation-alert">
    <div class="new-donation-text">
      <span>$19.95</span>
      <span>from</span>
      <span>ShippingAndHandling</span>
      <span> - Hello, World!</span>
    </div>
    <div class="slash-bot-wrapper">
      <div class="slash-bot-animate">
        <div class="slash-bot"></div>
      </div>
    </div>
    <div class="slash-top-wrapper">
      <div class="slash-top-animate">
        <div class="slash-top"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DonationAlert',
  mounted() {
    const vm = this;
    var donationRep = nodecg.Replicant('donations');
    donationRep.on('change', (newValue) => {
      vm.showNewDonation();
      setTimeout(function(){
        vm.hideNewDonation();
      }, 5000);
    })
  },
  methods: {
    showNewDonation: function() {
      const vm = this;
      vm.$anime.timeline()
        .add({
          targets: '.slash-bot-animate',
          skewX: {
            value: -25, delay: 0, duration: 50
          },
          scaleX: {
            value: 170, delay: 50, elasticity: 0, duration: 500, easing: 'easeInExpo'
          },
          offset: 0
        })
        .add({
          targets: '.slash-top-animate',
          skewX: {
            value: -25, delay: 0, duration: 50
          },
          scaleX: {
            value: 170, delay: 50, elasticity: 0, duration: 500, easing: 'easeInCubic'
          },
          offset: 250
        })
        .add({
          targets: '.new-donation-text',
          opacity: {
            value: 1,
            easing: 'linear',
            duration: 250
          },
          offset: 750
        });
      return;
    },
    hideNewDonation: function() {
      const vm = this;
      vm.$anime.timeline()
        .add({
          targets: '.new-donation-text',
          opacity: {
            value: 0,
            easing: 'linear',
            duration: 250
          },
          offset: 0
        })
        .add({
          targets: '.slash-top-animate',
          skewX: {
            value: -25, delay: 0, duration: 50
          },
          scaleX: {
            value: 0, delay: 50, elasticity: 0, duration: 500, easing: 'easeInExpo'
          },
          offset: 250
        })
        .add({
          targets: '.slash-bot-animate',
          skewX: {
            value: -25, delay: 0, duration: 50
          },
          scaleX: {
            value: 0, delay: 50, elasticity: 0, duration: 500, easing: 'easeInCubic'
          },
          offset: 500
        });
      return;
    }
  }
}
</script>

<style scoped>
.slash-bot-wrapper {
  position: absolute;
  z-index: 5;
  margin-left: -20px;
}
.slash-bot-animate {
  position: relative;
  display: inline-block;
}
.slash-bot {
  background: #7D292A;
  height: 30px;
  width: 10px;
  margin-left: 10px;
}
.slash-top-wrapper {
  position: absolute;
  z-index: 7;
  margin-left: -20px;
}
.slash-top-animate {
  position: relative;
  display: inline-block;
}
.slash-top {
  background: #fff;
  height: 30px;
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
  line-height: 28px;
  opacity: 0;
}
</style>

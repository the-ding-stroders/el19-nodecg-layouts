<template>
  <div id="app">
    <div class="lower-third-grid">
      <div class="logo-outer">
        <div class="logo-inner">
          <img src="imgs/thedingstroders.png" />
        </div>
      </div>
      <div class="donations">
        <DonationAlert/>
        <DonationsList/>
      </div>
      <div class="messages">
        <LowerMessages/>
      </div>
      <div class="totals">
        <div class="total-amount">
          $<IOdometer
             :value="donationAmount" format="(,ddd).DD" />
        </div>
        <div class="bg-text">totals</div>
      </div>
    </div>
  </div>
</template>

<script>
import DonationsList from './components/DonationsList.vue'
import DonationAlert from './components/DonationAlert.vue'
import LowerMessages from './components/LowerMessages.vue'
import Odometer from 'odometer/odometer.min.js'
import IOdometer from 'vue-odometer';
import 'odometer/themes/odometer-theme-default.css';

export default {
  name: 'LowerBar',
  components: {
    DonationAlert,
    DonationsList,
    IOdometer,
    LowerMessages
  },
  data() {
    return {
      donationAmount: 100
    }
  },
  mounted() {
    const vm = this;
    var donationRep = nodecg.Replicant('donations');
    donationRep.on('change', (newValue) => {
      vm.donationAmount = vm.donationAmount + newValue.raw;
    })
  }
}
</script>

<style>
#app {
  width: 1920px;
  height: 80px;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}
.lower-third-grid {
  display: grid;
  grid-template-columns: 280px  1319px  321px;
  grid-template-rows: 30px  50px;
  grid-template-areas:
        "logo-outer donations donations"
        "........... messages totals";

  width: 100%;
  z-index: 1;
  font-family: 'PTSans';
  background-color: #1d84b5;
  color: #f9fde2;
  box-sizing: border-box;
  overflow: hidden;
}
.logo-outer { grid-area: logo-outer; }
.donations { grid-area: donations; }
.messages { grid-area: messages; }
.totals { grid-area: totals; }

.lower-third-grid .logo-outer {
  display: inline-block;
  z-index: 10;
  height: 80px;
  width: 280px;
  position: relative;
  left: -35px;
  top: 0;
  background: #7D292A;
  transform: skew(-25deg, 0);
  overflow: hidden;
  padding-right: 10px;
}
.lower-third-grid .logo-outer .logo-inner {
  height: 80px;
  background: #021323;
}
.lower-third-grid .logo-outer .logo-inner img {
  max-width: 100%;
  max-height: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-left: 56px;
  transform: skew(25deg, 0);
}
.lower-third-grid .donations {
  display: inline-block;
  background: #131313;
  overflow: hidden;
  margin-left: -32px;
  padding-right: 20px;
  position: relative;
}
.lower-third-grid .messages {
  display: inline-block;
  bottom: 0;
  height: 100%;
  font-size: 34px;
  margin: 0 0 0 -20px;
}
.lower-third-grid .totals {
  background: #021323;
  position: relative;
}
.lower-third-grid .totals .bg-text{
    font-family: 'WhatARelief', sans-serif;
    color: rgba(232, 255, 81, 0.10);
    height: 100%;
    width: 100%;
    text-align: center;
    letter-spacing: 14px;
    position: absolute;
    bottom: 0;
    overflow: hidden;
    font-size: 52px;
}
.lower-third-grid .totals .total-amount {
  font-size: 40px;
  text-align: center;
}
</style>

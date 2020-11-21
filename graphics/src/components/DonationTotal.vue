<template>
  <div class="total-amount">
    <span
      class="dollar-sign text-adjustment"
    >$</span><IOdometer
      :value="donationTotal"
      format="(,ddd).DD"
    />
    <span
      v-if="showGoal"
      class="text-adjustment"
    >/ {{ fundraisingGoal | toCurrency }}</span>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars, import/extensions
import Odometer from 'odometer/odometer.min.js';
import IOdometer from 'vue-odometer';
import 'odometer/themes/odometer-theme-default.css';

export default {
  name: 'DonationTotal',
  components: {
    IOdometer,
  },
  props: {
    showGoal: {
      type: Boolean,
    },
  },
  data: () => ({
    donationTotal: 0,
    fundraisingGoal: 0,
  }),
  mounted() {
    const vm = this;
    const fundGoalRep = nodecg.Replicant('fundraisingGoal');

    fundGoalRep.on('change', () => {
      nodecg.readReplicant('fundraisingGoal', (value) => {
        vm.fundraisingGoal = value;
      });
    });

    nodecg.readReplicant('total', (value) => {
      vm.donationTotal = value;
    });

    nodecg.listenFor('donationAlert', () => {
      nodecg.readReplicant('total', (value) => {
        vm.donationTotal = value;
      });
    });
  },
};
</script>

<style>
.text-adjustment {
  padding-bottom: 2px;
  vertical-align: middle;
}
</style>

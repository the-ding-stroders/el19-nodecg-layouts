<template>
  <div class="donation" :class="'id-' + donation.donationID">
    <span v-if="donation.displayName">{{ donation.amount | toCurrency }} - {{ donation.displayName }}</span>
    <span v-else>{{ donation.amount | toCurrency }} - Anonymous</span>
  </div>
</template>

<script>
export default {
  props: {
    donation: {
      type: Object,
      required: true
    }
  },
  mounted: function() {
    jQuery(".id-" + this.donation.donationID).textfill({
      allowOverflow: true,
      maxFontPixels: 24
    });
  }
}
</script>

<style>
.donation {
  width: 200px;
  letter-spacing: 1px;
  display: flex;
  height: 76px;
  line-height: 76px;
  margin: 0 10px;
  text-align: center;
  justify-content: center;
  align-items: center;
}
.donation div {
  display: inline-block;
}
.donation span {
    line-height: normal;
}
.donation .amount {
  color: #eee;
  background: #000;
  width: 52px;
}
.donation .name {
  width: 216px;
}
</style>

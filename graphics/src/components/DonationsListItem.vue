<template>
  <div class="donation" :class="'id-' + donation.id">
    <span>{{ donation.amount }} - {{ donation.name }}</span>
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
    jQuery(".id-" + this.donation.id).textfill({
      allowOverflow: true,
      maxFontPixels: 24
    });
  }
}
</script>

<style>
.donation {
  width: 450px;
  letter-spacing: 1px;
  display: flex;
  height: 30px;
  line-height: 30px;
  margin: 0 10px;
}
.donation div {
  display: inline-block;
}
.donation span {
    margin: 0 auto;
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

<template>
  <div class="discord-member" v-bind:class="{ active: member.speaking }">
    <div class="avatar"><img :src="member.avatar" /></div>
    <div class="username">{{ member.nickname }}</div>
  </div>
</template>

<script>
export default {
  props: {
    member: {
      type: Object,
      required: true
    }
  },
  created: function() {
    jQuery(".discord-member").fitText();
  },
  mounted: function() {
    jQuery(".discord-member").fitText();
  }
}
</script>

<style>
.discord-member {
  background: #aaa;
  display: flex;
  height: 46px;
  width: 250px;
  opacity: 0.25;
  line-height: 40px;
  margin: 10px 0;
}
.discord-member.active {
  background: #fff;
  opacity: 1;
}
.discord-member .username {
    padding-left: 10px;
}
.discord-member .avatar {
  border-color: #7D292A;
  border-width: 1px 1px 0 1px;
  border-style: solid;
}
.discord-member .avatar img {
  max-height: 100%;
  max-width: 100%;
}
</style>

<template>
  <!-- v-if="speakers.length" -->
  <div class="discord-channel">
    <DiscordChannelMember
      v-for="member in members"
      :key="member.id"
      :member="member"
    />
  </div>
</template>

<script>
import DiscordChannelMember from './DiscordChannelMember.vue'

export default {
  components: {
    DiscordChannelMember
  },
  data() {
    return {
      members: {}
    }
  },
  created: function() {
    jQuery(".discord-member").fitText(); // remove when done testing
  },
  mounted: function() {
    jQuery(".discord-member").fitText(); // remove when done testing
    var voiceRoster = nodecg.Replicant('tds:voiceRoster');
    voiceRoster.on('change', (newValue) => {
      newValue = JSON.stringify(newValue);
      newValue = JSON.parse(newValue);
      this.members = newValue;
      return
    })
  }
}
</script>

<style>
.discord-channel {
  width: 100%;
  margin-top: 50px;
}
</style>

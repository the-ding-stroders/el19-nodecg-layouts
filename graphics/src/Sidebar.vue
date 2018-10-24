<template>
  <div id="app">
    <div class="video-capture-div"></div>
    <div class="sidebar-div" id="divSidebar">
      <DiscordChannel/>
		</div>
  </div>
</template>

<script>
import DiscordChannel from './components/DiscordChannel.vue'

export default {
  name: 'app',
  components: {
    DiscordChannel
  }
}
</script>

<style>
#app {
  width: 1920px;
  height: 1080px;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}
</style>

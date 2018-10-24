<template>
  <div id="app">
    <v-app dark>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs12>
            <div id="warningMsg">The controls in this panel shouldn't be needed unless necessary; music should pause/play automatically.</div>
            <v-divider></v-divider>
          	<div><b>Current Track: {{ currentTrack }}</b></div>
          	<v-btn
              v-if="!playing"
              @click="pausePlaySong"
              color="primary"
            >
              <v-icon>play_arrow</v-icon> Play Music
            </v-btn>
          	<v-btn
              v-else
              @click="pausePlaySong"
              color="success"
            >
              <v-icon>pause</v-icon> Pause Music
            </v-btn>
          	<v-btn
              @click="skipSong"
              color="primary"
              :disabled="!playing"
              outline
            >
              <v-icon>skip_next</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: () => ({
    currentTrack: 'No Track Playing',
    playing: false
  }),
  methods: {
    pausePlaySong: function() {
      nodecg.sendMessage('pausePlaySong');
    },
    skipSong: function() {
      nodecg.sendMessage('skipSong');
    }
  },
  mounted() {
    const songData = nodecg.Replicant('songData');
    const vm = this;
    songData.on('change', (newVal) => {
      if (newVal.playing) {
        vm.$data.playing = true;
      } else {
        vm.$data.playing = false;
      }
      vm.$data.currentTrack = newVal.title;
    })
  }
}
</script>

<style>

</style>

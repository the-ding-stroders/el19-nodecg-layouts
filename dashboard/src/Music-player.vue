<template>
  <div id="app">
    <v-app>
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
              <v-icon>mdi-play</v-icon> Play Music
            </v-btn>
          	<v-btn
              v-else
              @click="pausePlaySong"
              color="success"
            >
              <v-icon>mdi-pause</v-icon> Pause Music
            </v-btn>
          	<v-btn
              @click="skipSong"
              color="primary"
              :disabled="!playing"
              outlined
            >
              <v-icon>mdi-skip-next</v-icon>
            </v-btn>
            <v-divider></v-divider>
            <v-slider
              v-model="volume"
              :disabled="!playing"
              append-icon="mdi-volume-plus"
              prepend-icon="mdi-volume-minus"
              @click:append="volUp"
              @click:prepend="volDown"
            ></v-slider>
            <v-btn
              @click="setLevel('foreground')"
              color="success"
              :disabled="!playing"
              outlined
            >
              Set Foreground Level
            </v-btn>
            <v-btn
              @click="setLevel('background')"
              color="success"
              :disabled="!playing"
              outlined
            >
              Set Background Level
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
    playing: false,
    volume: 100
  }),
  methods: {
    pausePlaySong: function() {
      nodecg.sendMessage('pausePlaySong');
    },
    setLevel: function(target) {
      const data = {
        target: target,
        volume: this.volume
      }
      nodecg.sendMessage('setLevel', data);
    },
    skipSong: function() {
      nodecg.sendMessage('skipSong');
    },
    volDown: function() {
      this.volume = (this.volume - 10) || 0;
    },
    volUp: function() {
      this.volume = (this.volume + 10) || 100;
    }
  },
  mounted() {
    const currentVolume = nodecg.Replicant('mpd:currentVolume');
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

    currentVolume.on('change', (newVol) => {
      vm.volume = newVol;
    })
  }
}
</script>

<style>

</style>

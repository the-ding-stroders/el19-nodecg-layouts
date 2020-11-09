<template>
  <div id="app">
    <v-app>
      <v-container
        grid-list-md
        text-xs-center
      >
        <v-layout
          row
          wrap
        >
          <v-flex xs12>
            <div id="warningMsg">
              The controls in this panel shouldn't be needed unless necessary; music should
              pause/play automatically.
            </div>
            <v-divider />
            <div><b>Current Track: {{ currentTrack }}</b></div>
            <v-btn
              v-if="!playing"
              color="primary"
              @click="pausePlaySong"
            >
              <v-icon>mdi-play</v-icon> Play Music
            </v-btn>
            <v-btn
              v-else
              color="success"
              @click="pausePlaySong"
            >
              <v-icon>mdi-pause</v-icon> Pause Music
            </v-btn>
            <v-btn
              color="primary"
              :disabled="!playing"
              outlined
              @click="skipSong"
            >
              <v-icon>mdi-skip-next</v-icon>
            </v-btn>
            <v-divider />
            <v-slider
              v-model="volume"
              :disabled="!playing"
              append-icon="mdi-volume-plus"
              prepend-icon="mdi-volume-minus"
              @click:append="volUp"
              @click:prepend="volDown"
            />
            <v-btn
              color="success"
              :disabled="!playing"
              outlined
              @click="setLevel('foreground')"
            >
              Set Foreground Level
            </v-btn>
            <v-btn
              color="success"
              :disabled="!playing"
              outlined
              @click="setLevel('background')"
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
  name: 'App',
  data: () => ({
    currentTrack: 'No Track Playing',
    playing: false,
    volume: 100,
  }),
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
    });

    currentVolume.on('change', (newVol) => {
      vm.volume = newVol;
    });
  },
  methods: {
    pausePlaySong() {
      nodecg.sendMessage('pausePlaySong');
    },
    setLevel(target) {
      const data = {
        target,
        volume: this.volume,
      };
      nodecg.sendMessage('setLevel', data);
    },
    skipSong() {
      nodecg.sendMessage('skipSong');
    },
    volDown() {
      this.volume = (this.volume - 10) || 0;
    },
    volUp() {
      this.volume = (this.volume + 10) || 100;
    },
  },
};
</script>

<style>

</style>

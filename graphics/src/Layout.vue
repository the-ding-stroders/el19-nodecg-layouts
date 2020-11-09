<template>
  <div id="app">
    <v-app>
      <v-container
        grid-list-md
        class="mx-2 layout-container"
      >
        <v-layout
          row
          wrap
          align-center
          justify-center
          fill-height
        >
          <LayoutStreamer
            v-for="streamer in streamers"
            :streamer="streamer"
            :size="size"
          />
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import LayoutStreamer from './components/LayoutStreamer.vue';

export default {
  name: 'Layout',
  components: {
    LayoutStreamer,
  },
  data() {
    return {
      layout: '',
      size: 6,
      streamers: {},
    };
  },
  created() {
    const vm = this;
    const params = new URLSearchParams(location.search);

    vm.layout = params.get('layout');
    if (vm.layout === 'single') {
      vm.size = 12;
    }
    vm.getHash();

    window.onhashchange = function () {
      vm.getHash();
    };
  },
  methods: {
    getHash() {
      const vm = this;
      const streamerParams = [
        'streamer0',
        'streamer1',
        'streamer2',
        'streamer3',
      ];

      let { hash } = location;
      // Remove the first character (i.e. the prepended "#").
      hash = hash.substring(1, hash.length);

      // This is where we will store our properties and values.
      const hashObj = {};

      // Get the streamer replicant for later use
      const streamerRep = nodecg.readReplicant('tds:streamers', (streamers) => {
        const BreakException = {};

        try {
          // Split on the delimiter "&" and for each key/val pair...
          hash.split('&').forEach((q, index) => {
            const hashSplit = q.split(/=/);
            // Get the property by splitting the entry
            const prop = hashSplit[0];
            // If the property is a streamer, add it. Otherwise, skip.
            if (streamerParams.includes(prop)) {
              // Get the value from the split entry
              const val = hashSplit[1];

              // If the property and key are defined and they're a valid streamer
              if (typeof prop !== 'undefined' && typeof val !== 'undefined' && streamers[val]) {
                hashObj[prop] = streamers[val];
              }
            }

            switch (vm.layout) {
              case 'single':
                if (index === 0) throw BreakException;
                break;
              case 'double':
                if (index === 1) throw BreakException;
                break;
            }
          });
        } catch (e) {
          if (e !== BreakException) throw e;
        }

        vm.streamers = hashObj;
      });
    },
  },
};
</script>

<style>
#app {
  width: 1670px;
  height: 1000px;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  font-family:'SourceSansPro', sans-serif;
}
.layout-container {
  height: 1000px;
}
.application {
  background: none !important;
}
.nametag-icon {
  background: #7D292A;
}
.nametag-icon .v-icon {
  color: #F9FDE2;
  line-height: 10px;
  vertical-align: bottom;
}
.nametag-text {
  background: #F9FDE2;
  color: #021323;
  font-size: 20px;
}
.video-border {
  background: #7D292A;
  vertical-align: bottom;
}
</style>

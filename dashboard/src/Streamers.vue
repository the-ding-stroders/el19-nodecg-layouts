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
          <StreamersCard
            v-for="streamer in streamers"
            :key="streamer.name"
            :streamer="streamer"
          />
          <v-flex xs4>
            <v-card>
              <v-card-text>
                <StreamersDialog />
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import StreamersCard from './StreamersCard.vue';
import StreamersDialog from './StreamersDialog.vue';

export default {
  name: 'App',
  components: {
    StreamersCard,
    StreamersDialog,
  },
  data: () => ({
    discord: null,
    name: null,
    url: null,
    twitter: null,
    streamers: {},
  }),
  watch: {
    streamers(updStreamers) {
      const streamerRep = nodecg.Replicant('tds:streamers');
      streamerRep.value = updStreamers;
    },
  },
  mounted() {
    const vm = this;
    nodecg.readReplicant('tds:streamers', (streamers) => {
      vm.$data.streamers = streamers;
    });
    nodecg.listenFor('layoutUpdated', () => {
      vm.updateStreamers();
    });
    nodecg.listenFor('audioUpdated', () => {
      vm.updateStreamers();
    });
  },
  methods: {
    updateStreamers() {
      const vm = this;
      nodecg.readReplicant('tds:streamers', (streamers) => {
        vm.$data.streamers = streamers;
      });
    },
  },
};
</script>

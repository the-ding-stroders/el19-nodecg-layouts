<template>
  <div id="app">
    <v-app dark>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <StreamersCard
            v-for="streamer in streamers"
            :key="streamer.name"
            :streamer="streamer"
          ></StreamersCard>
          <v-flex xs4>
            <v-card>
              <v-card-text>
                <StreamersDialog></StreamersDialog>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import StreamersCard from './StreamersCard.vue'
import StreamersDialog from './StreamersDialog.vue'

export default {
  name: 'app',
  components: {
    StreamersCard,
    StreamersDialog
  },
  data: () => ({
    discord: null,
    name: null,
    url: null,
    twitter: null,
    streamers: {}
  }),
  methods: {
    updateStreamers: function() {
      const vm = this;
      nodecg.readReplicant('tds:streamers', streamers => {
        vm.$data.streamers = streamers;
      });
    }
  },
  mounted: function() {
    const vm = this;
    nodecg.readReplicant('tds:streamers', streamers => {
      vm.$data.streamers = streamers;
    });
    nodecg.listenFor('layoutUpdated', () => {
      vm.updateStreamers();
    });
    nodecg.listenFor('audioUpdated', () => {
      vm.updateStreamers();
    });
  },
  watch: {
    streamers: function (updStreamers) {
      const streamerRep = nodecg.Replicant('tds:streamers');
      streamerRep.value = updStreamers;

    }
  }
}
</script>

<template>
  <div id="app">
    <v-app dark>
      <v-container grid-list-md text-xs-center>
        <v-form ref="form" v-if="formVisible">
          <v-layout row wrap>
            <v-flex xs6>
              <v-text-field
                label="Name"
                v-model="name"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                label="Discord ID"
                v-model="discord"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs6>
              <v-text-field
                label="Relay URL"
                v-model="url"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                label="Twitter"
                v-model="twitter"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 align-content-end>
              <v-btn>
                Hide
              </v-btn>
              <v-btn
                color="secondary"
                @click="addStreamer()"
              >
                Add Streamer
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
        <v-layout row wrap>
          <StreamersCard
            v-for="streamer in streamers"
            :key="streamer.name"
            :streamer="streamer"
          ></StreamersCard>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import StreamersCard from './StreamersCard.vue'

export default {
  name: 'app',
  components: {
    StreamersCard
  },
  data: () => ({
    discord: null,
    formVisible: false,
    name: null,
    url: null,
    twitter: null,
    streamers: {}
  }),
  methods: {
    addStreamer: function() {
      const vm = this;

      const newStreamer = {
        name: vm.name,
        discord: vm.discord,
        url: vm.url,
        twitter: vm.twitter,
        audio: false
      }
      vm.$data.streamers[vm.name] = newStreamer;
      vm.clearForm();
    },
    clearForm: function() {
      const vm = this;
      vm.$refs.form.reset();
    },
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

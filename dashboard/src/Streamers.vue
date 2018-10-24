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
          <v-flex xs4
            v-for="streamer in streamers"
            :key="streamer.name"
            :streamer="streamer"
          >
            <v-card>
              <v-card-title>
                <div class="headline">{{ streamer.name }}</div>
              </v-card-title>
              <v-card-text>
                <div>{{ streamer.twitter }}</div>
                <div>{{ streamer.discord }}</div>
                <div class="text-truncate">{{ streamer.url }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn-toggle v-model="streamer.position">
                  <v-btn
                    large
                    :ripple="false"
                    class="px-2"
                    @click="updatePosition('0', streamer)"
                  >
                    <v-icon>looks_one</v-icon>
                  </v-btn>
                  <v-btn
                    large
                    :ripple="false"
                    class="px-2"
                    @click="updatePosition('1', streamer)"
                  >
                    <v-icon>looks_two</v-icon>
                  </v-btn>
                  <v-btn
                    large
                    :ripple="false"
                    class="px-2"
                    @click="updatePosition('2', streamer)"
                  >
                    <v-icon>looks_3</v-icon>
                  </v-btn>
                  <v-btn
                    large
                    :ripple="false"
                    class="px-2"
                    @click="updatePosition('3', streamer)"
                  >
                    <v-icon>looks_4</v-icon>
                  </v-btn>
                </v-btn-toggle>
                <v-btn
                  class="mx-2"
                  @click="updateAudio(streamer)"
                  icon
                >
                  <v-icon
                    :class="{'green--text': streamer.audio}"
                  >
                    volume_up
                  </v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
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
    updateAudio: function(target) {
      nodecg.log.info(JSON.stringify(target));
      nodecg.log.info('stream position updated');
      nodecg.sendMessage('switchAudio', target);
    },
    updatePosition: function(newPosition, streamer) {
      nodecg.log.info('stream position updated');
      nodecg.sendMessage('updateStreamPosition', {
        position: newPosition,
        streamer: streamer
      });
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

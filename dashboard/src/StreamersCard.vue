<template>
  <v-flex xs4>
    <v-card>
      <v-card-text>
        <v-toolbar dark>
          <v-toolbar-title>{{ streamer.name }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <StreamersDialog :streamer="streamer">
            <v-icon slot="btnIcon">edit</v-icon>
          </StreamersDialog>
        </v-toolbar>
        <v-list>
          <v-list-tile>
            <v-list-tile-avatar>
              <v-icon>fas fa-video</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ streamer.url }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-if="streamer.twitch">
            <v-list-tile-avatar>
              <v-icon>fab fa-twitch</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ streamer.twitch }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-if="streamer.twitter">
            <v-list-tile-avatar>
              <v-icon>fab fa-twitter</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ streamer.twitter }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-if="streamer.discord">
            <v-list-tile-avatar>
              <v-icon>fab fa-discord</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ streamer.discord }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
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
</template>

<script>
import StreamersDialog from './StreamersDialog.vue'

export default {
  name: 'StreamersCard',
  components: {
    StreamersDialog
  },
  props: {
    streamer: {
      type: Object,
      required: true
    }
  },
  methods: {
    updateAudio: function(target) {
      nodecg.sendMessage('switchAudio', target);
    },
    updatePosition: function(newPosition, streamer) {
      nodecg.sendMessage('updateStreamPosition', {
        position: newPosition,
        streamer: streamer
      });
    }
  },
  mounted() {
    const vm = this;
    nodecg.listenFor('streamerUpdated', (newStreamer) => {
      if(newStreamer.name === streamer.name) {
        vm.streamer = newStreamer;
      }
    });
  }
}
</script>

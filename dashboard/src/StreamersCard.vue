<template>
  <v-flex xs4>
    <v-card>
      <v-card-title>
        <div class="headline">{{ streamer.name }}</div>
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{ streamer.twitter }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{ streamer.discord }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{ streamer.url }}</v-list-tile-title>
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
export default {
  name: 'StreamersCard',
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
  }
}
</script>

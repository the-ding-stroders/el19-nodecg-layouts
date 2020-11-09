<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="500px"
  >
    <template #activator="{ on }">
      <v-btn
        v-if="hasIcon"
        slot="activator"
        color="primary"
        dark
        icon
        v-on="on"
      >
        <slot name="btnIcon" />
      </v-btn>
      <v-btn
        v-else
        slot="activator"
        color="primary"
        dark
        v-on="on"
      >
        Add New Streamer
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span
          v-if="streamerExists"
          class="headline"
        >Update {{ streamer.name }}</span>
        <span
          v-else
          class="headline"
        >New Streamer</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form">
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="streamerLocal.name"
                  label="Name"
                  required
                  :disabled="streamerExists"
                />
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  v-model="streamerLocal.discord"
                  label="Discord ID"
                />
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  v-model="streamerLocal.twitter"
                  label="Twitter"
                />
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  v-model="streamerLocal.twitch"
                  label="Twitch"
                />
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="streamerLocal.url"
                  label="Relay URL"
                  required
                />
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          @click.native="dialog = false"
        >
          Cancel
        </v-btn>
        <v-btn
          color="success darken-1"
          @click="saveStreamer()"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'StreamersDialog',
  props: {
    streamer: {
      type: Object,
      required: false,
      default() {
        return {
          audio: false,
        };
      },
    },
  },
  data() {
    return {
      dialog: false,
      streamerLocal: { ...this.streamer },
    };
  },
  computed: {
    hasIcon() {
      return !!this.$slots.btnIcon;
    },
    streamerExists() {
      if (this.streamer.name) {
        return true;
      }
      return false;
    },
  },
  methods: {
    saveStreamer() {
      const vm = this;

      const streamerRep = nodecg.Replicant('streamers', 'tds-2020-layouts');
      streamerRep.value[vm.streamer.name] = vm.streamerLocal;
      nodecg.sendMessage('streamerUpdated', vm.streamerLocal);

      // Close the dialog box
      vm.dialog = false;
    },
  },
};
</script>

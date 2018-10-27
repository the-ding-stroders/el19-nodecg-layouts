<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-btn v-if="hasIcon" slot="activator" color="primary" dark icon>
      <slot name="btnIcon"></slot>
    </v-btn>
    <v-btn v-else slot="activator" color="primary" dark>
      Add New Streamer
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline" v-if="streamerExists">Update {{ streamer.name }}</span>
        <span class="headline" v-else>New Streamer</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form">
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  label="Name"
                  v-model="streamerLocal.name"
                  required
                  :disabled="streamerExists"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label="Discord ID"
                  v-model="streamerLocal.discord"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label="Twitter"
                  v-model="streamerLocal.twitter"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Relay URL"
                  v-model="streamerLocal.url"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="dialog = false">Cancel</v-btn>
        <v-btn color="success darken-1" @click="saveStreamer()">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'StreamersDialog',
  computed: {
    hasIcon () {
      return !!this.$slots['btnIcon']
    },
    streamerExists: function () {
      if (this.streamer.name) {
        return true;
      } else {
        return false;
      }
    }
  },
  data () {
    return {
      dialog: false,
      streamerLocal: {...this.streamer}
    }
  },
  methods: {
    saveStreamer: function() {
      const vm = this;

      const streamerRep = nodecg.Replicant('tds:streamers');
      streamerRep.value[vm.streamer.name] = vm.streamerLocal;
      nodecg.sendMessage('streamerUpdated', vm.streamerLocal)

      // Close the dialog box
      vm.dialog = false;
    }
  },
  props: {
    streamer: {
      type: Object,
      required: false,
      default: function() {
        return {
          audio: false
        }
      }
    }
  },
}
</script>

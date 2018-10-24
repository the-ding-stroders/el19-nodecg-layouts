<template>
  <div id="app">
    <v-app dark>
      <v-container grid-list-md text-xs-center>
        <v-form ref="form">
          <v-layout row wrap>
            <v-flex xs8>
              <v-text-field
                label="IP Address"
                placeholder="127.0.0.1"
                v-model="ip"
                :disabled="connecting || connected"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                label="Port"
                value="4444"
                v-model="port"
                :disabled="connecting || connected"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="Password"
                type="password"
                v-model="password"
                :disabled="connecting || connected"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 align-content-end>
              <v-btn
                :loading="connecting"
                :disabled="!connected"
                color="error"
                @click="disconnectObs"
              >
                Disconnect
              </v-btn>
              <v-btn
                :loading="connecting"
                :disabled="connecting || connected"
                color="secondary"
                @click="connectObs"
              >
                Connect
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: () => ({
    ip: null,
    port: 4444,
    password: null,
    connected: false,
    connecting: false,
    loader: null
  }),
  methods: {
    connectObs: function() {
      const vm = this;
      vm.connecting = true;

      nodecg.sendMessage('obs:connect', {
        ip: vm.ip,
        port: vm.port,
        password: vm.password
      }, err => {
        vm.connecting = false;
        if (err) {
          nodecg.log.error(err);
          return;
        }
        vm.$data.connected = true;
        return;
      });
    },
    disconnectObs: function() {
      const vm = this;

      nodecg.sendMessage('obs:disconnect', err => {
        if (err) {
          nodecg.log.error(err);
          return;
        }
        vm.$data.connected = false;
        return;
      });
    }
  },
  mounted() {
    const vm = this;
    const obsWebsocket = nodecg.Replicant('obs:websocket');
    const obsSceneList = nodecg.Replicant('obs:sceneList');
    const obsPreviewScene = nodecg.Replicant('obs:previewScene');

    obsWebsocket.on('change', websocket => {
      vm.$data.ip = websocket.ip;
      vm.$data.port = websocket.port;
      vm.$data.password = websocket.password;
      if (websocket.status === 'connected') {
        vm.$data.connected = true;
        nodecg.log.info(obsPreviewScene);
      } else {
        vm.$data.connected = false;
      }
    });
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]
      setTimeout(() => (this[l] = false), 3000)
      this.loader = null
    }
  }
}
</script>

<style>
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>

<template>
  <div id="app">
    <v-app>
      <v-container
        grid-list-md
        text-xs-center
      >
        <v-row>
          <v-col>
            <h3>
              {{ settings.discordAlertsEnabled.name }}
              <SettingHelp
                :description="settings.discordAlertsEnabled.description"
              />
            </h3>
            <v-checkbox
              v-model="settings.discordAlertsEnabled.value"
              label="Enabled"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h3>
              {{ settings.donationDisplayTime.name }}
              <SettingHelp
                :description="settings.donationDisplayTime.description"
              />
            </h3>
            <v-text-field
              v-model.number="settings.donationDisplayTime.value"
              hide-details
              suffix="milliseconds"
              type="number"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h3>
              {{ settings.idleScreenMsg.name }}
              <SettingHelp
                :description="settings.idleScreenMsg.description"
              />
            </h3>
            <v-text-field
              v-model="tempMsg.value"
              :append-icon="tempMsg.dirty ? 'mdi-send' : ''"
              :clear-icon="tempMsg.dirty ? 'mdi-close-circle' : ''"
              clearable
              @click:append="saveMsg"
              @click:clear="resetMsg"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import SettingHelp from './components/SettingHelp.vue';

export default {
  name: 'App',
  components: {
    SettingHelp,
  },
  data: () => ({
    settings: {
      discordAlertsEnabled: {
        description: '',
        name: '',
        value: null,
      },
      donationDisplayTime: {
        description: '',
        name: '',
        value: null,
      },
      idleScreenMsg: {
        description: '',
        name: '',
        value: null,
      },
    },
    tempMsg: {
      dirty: false,
      value: '',
    },
  }),
  computed: {
    tempMsgValue() {
      return this.tempMsg.value;
    },
  },
  watch: {
    settings(newSettings) {
      const settingsRep = nodecg.Replicant('settings');

      settingsRep.value = newSettings;
    },
    tempMsgValue() {
      const vm = this;
      const msgDirty = vm.tempMsg.value !== vm.settings.idleScreenMsg.value;

      if (msgDirty === true) {
        vm.tempMsg.dirty = true;
      } else {
        vm.tempMsg.dirty = false;
      }
    },
  },
  created() {
    const vm = this;
    const settingsRep = nodecg.Replicant('settings');

    NodeCG.waitForReplicants(settingsRep).then(() => {
      vm.settings = settingsRep.value;
      vm.tempMsg.value = vm.settings.idleScreenMsg.value;

      settingsRep.on('change', (newValue) => {
        vm.settings = newValue;
        vm.tempMsg.value = vm.settings.idleScreenMsg.value;
      });
    });
  },
  methods: {
    resetMsg() {
      const vm = this;
      vm.tempMsg.dirty = false;

      vm.tempMsg.value = vm.settings.idleScreenMsg.value;
    },
    saveMsg() {
      const vm = this;
      vm.tempMsg.dirty = false;
      const settingsRep = nodecg.Replicant('settings');

      settingsRep.value.idleScreenMsg.value = vm.tempMsg.value;
    },
  },
};
</script>

<style>

</style>

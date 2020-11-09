<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="logo in logos"
        :key="logo.base"
        :cols="4"
      >
        <v-card
          :elevation="6"
        >
          <v-img
            :src="logo.url"
            height="200px"
            class="pa-4"
          />
          <v-card-actions>
            <v-spacer />
            <v-btn
              :disabled="currentLogoUrl === logo.url"
              @click="changeCurrentLogo(logo.url)"
            >
              Make Active
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LogoSelectorTDS',
  data: () => ({
    logos: [],
    currentLogoUrl: '',
  }),
  mounted() {
    const vm = this;

    const tdslogosRep = nodecg.Replicant('assets:tdslogos');
    const currentLogoRep = nodecg.Replicant('currentLogo', 'tds-2020-layouts');
    NodeCG.waitForReplicants(tdslogosRep, currentLogoRep).then(() => {
      nodecg.readReplicant('assets:tdslogos', (value) => {
        this.logos = value;
      });
      nodecg.readReplicant('currentLogo', 'tds-2020-layouts', (value) => {
        this.currentLogoUrl = value;
      });
    });
  },
  methods: {
    changeCurrentLogo(newUrl) {
      const tdsCurrentLogo = nodecg.Replicant('currentLogo', 'tds-2020-layouts');
      tdsCurrentLogo.value = newUrl;
      this.currentLogoUrl = newUrl;
    },
  },
};
</script>

<style>

</style>

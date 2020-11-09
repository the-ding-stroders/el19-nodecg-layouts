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
              v-if="isLogoActive(logo.base)"
              @click="changeCurrentCharities(logo, 'remove')"
            >
              Make Inactive
            </v-btn>
            <v-btn
              v-else
              @click="changeCurrentCharities(logo, 'add')"
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
  name: 'LogoSelectorCharities',
  data: () => ({
    logos: [],
    currentCharities: [],
  }),
  mounted() {
    const vm = this;

    const charityLogosRep = nodecg.Replicant('assets:charitylogos');
    const currentCharitiesRep = nodecg.Replicant('currentCharities', 'tds-2020-layouts');
    NodeCG.waitForReplicants(charityLogosRep, currentCharitiesRep).then(() => {
      nodecg.readReplicant('assets:charitylogos', (value) => {
        this.logos = value;
      });
      nodecg.readReplicant('currentCharities', 'tds-2020-layouts', (value) => {
        this.currentCharities = value;
      });
    });
  },
  methods: {
    changeCurrentCharities(logo, action) {
      console.log(JSON.stringify(logo));
      const tdsCurrentCharities = nodecg.Replicant('currentCharities', 'tds-2020-layouts');
      if (action === 'add') {
        console.log('add logo');
        // tdsCurrentCharities.value.push(logo);
        this.currentCharities.push(logo);
        tdsCurrentCharities.value = this.currentCharities;
      } else if (action === 'remove') {
        console.log('remove logo');
        // tdsCurrentCharities.value = tdsCurrentCharities.value.filter(
        //     function(el) { return el.base != logo.base }
        // )
        console.log('--- remove from local');
        this.currentCharities = this.currentCharities.filter(
          (el) => el.base != logo.base,
        );
        console.log('--- remove from rep');
        tdsCurrentCharities.value = this.currentCharities;
      }
    },
    isLogoActive(basename) {
      if (this.currentCharities.some((logo) => logo.base === basename)) {
        console.log('isActive true');
        return true;
      }
      console.log('isActive false');
      return false;
    },
  },
};
</script>

<style>

</style>

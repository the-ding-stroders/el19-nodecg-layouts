<template>
  <div id="app">
    <v-app>
      <v-container
        grid-list-md
        text-xs-center
      >
        <v-data-table
          :headers="headers"
          :items="donations"
          :items-per-page="10"
          class="elevation-1"
        >
          <template #[`item.amount`]="{ item }">
            ${{ item.amount }}
          </template>
          <template #[`item.read`]="{ item }">
            <v-simple-checkbox v-model="item.read" />
          </template>
          <template #[`item.shown`]="{ item }">
            <v-simple-checkbox
              v-model="item.shown"
              disabled
            />
          </template>
        </v-data-table>
        <v-btn
          icon
          color="green"
          @click="getTwitchInfo()"
        >
          <v-icon>mdi-cached</v-icon>
        </v-btn>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  data: () => ({
    headers: [
      {
        text: 'Amount',
        value: 'amount',
      },
      {
        text: 'Name',
        value: 'name',
      },
      {
        text: 'Read?',
        value: 'read',
      },
      {
        text: 'Shown?',
        value: 'shown',
      },
    ],
    supportable: false,
    total: 0,
    supportingCampaigns: [],
  }),
  computed: {
    donations() {
      return this.$store.state.donations;
    },
  },
  mounted() {
    const donationsRep = nodecg.Replicant('donations', 'nodecg-tiltify');
    donationsRep.on('change', () => {
      this.updateDonations();
    });
  },
  methods: {
    ...mapActions([
      'updateDonations',
    ]),
  },
};
</script>

<style>

</style>

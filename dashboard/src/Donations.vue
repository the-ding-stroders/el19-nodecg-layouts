<template>
    <div id="app">
        <v-app>
            <v-container grid-list-md text-xs-center>
                <template>
                    <v-data-table
                        :headers="headers"
                        :items="donations"
                        :items-per-page="10"
                        class="elevation-1"
                    >
                        <template v-slot:item.amount="{ item }">
                            ${{ item.amount }}
                        </template>
                        <template v-slot:item.read="{ item }">
                            <v-simple-checkbox v-model="item.read"></v-simple-checkbox>
                        </template>
                        <template v-slot:item.shown="{ item }">
                            <v-simple-checkbox v-model="item.shown" disabled></v-simple-checkbox>
                        </template>
                    </v-data-table>
                </template>
                <v-btn
                    @click="getTwitchInfo()"
                    icon
                    color="green"
                >
                    <v-icon>mdi-cached</v-icon>
                </v-btn>
            </v-container>
        </v-app>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'app',
    computed: {
        donations () {
            return this.$store.state.donations
        }
    },
    data: () => ({
        headers: [
            {
                text: 'Amount',
                value: 'amount'
            },
            {
                text: 'Name',
                value: 'name'
            },
            {
                text: 'Read?',
                value: 'read'
            },
            {
                text: 'Shown?',
                value: 'shown'
            }
        ],
        supportable: false,
        total: 0,
        supportingCampaigns: []
    }),
    methods: {
        ...mapActions([
            'updateDonations'
        ])
    },
    mounted: function() {
        const vm = this;

        const donationsRep = nodecg.Replicant('donations', 'nodecg-tiltify')
        donationsRep.on('change', () => {
            this.updateDonations()
        })
    }
}
</script>

<style>

</style>
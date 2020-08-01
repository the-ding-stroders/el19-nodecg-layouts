<template>
    <img :src="currentCharityLogo" />
</template>

<script>
export default {
    name: 'CharityLogos',
    data: () => ({
        currentCharities: [],
        currentCharityLogo: ''
    }),
    mounted() {
        const vm = this;
        const currentCharitiesRep = nodecg.Replicant('currentCharities', 'tds-2020-layouts');
        NodeCG.waitForReplicants(currentCharitiesRep).then(() => {
            // provide the initial value
            nodecg.readReplicant('currentCharities', 'tds-2020-layouts', value => {
                this.currentCharities = value;

                // now watch for future changes
                currentCharitiesRep.on('change', (newValue, oldValue) => {
                    this.currentCharities = newValue;
                    // if there are now multiple logos, start rotation
                    if (newValue.length >=2 ) {
                        this.displayLogos()
                    }
                })
            })
        })
    },
    methods: {
        async displayLogos () {
            // Set the current logo source based on single or multiple active logos
            if (this.currentCharities.length === 1) {
                this.currentCharityLogo = this.currentCharities[0].url
            } else {
                for (var i = 0; i < this.currentCharities.length; i++) {
                    this.currentCharityLogo = this.currentCharities[i].url
                    await this.sleep(5)
                    if (i === this.currentCharities.length-1) {
                        this.displayLogos();
                    }
                }
            }
        },
        sleep(duration) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve()
                }, duration * 1000)
            })
        }
    }
}
</script>

<style>

</style>
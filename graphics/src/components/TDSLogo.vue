<template>
    <img :src="currentLogoSrc" />
</template>

<script>
export default {
    name: 'TDSLogo',
    data: () => ({
        currentLogoSrc: '',
    }),
    mounted() {
        const vm = this;
        nodecg.readReplicant('currentLogo', 'tds-2020-layouts', value => {
            this.currentLogoSrc = value;
        })
    }
}
</script>

<style>

</style>
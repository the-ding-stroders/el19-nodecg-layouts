<template>
    <v-app>
        <LogoSelectorTDS></LogoSelectorTDS>
        <LogoSelectorCharities></LogoSelectorCharities>
    </v-app>
</template>

<script>
import LogoSelectorTDS from './components/LogoSelectorTDS'
import LogoSelectorCharities from './components/LogoSelectorCharities'

export default {
    name: 'app',
    components: {
        LogoSelectorCharities,
        LogoSelectorTDS
    }
}
</script>

<style>

</style>
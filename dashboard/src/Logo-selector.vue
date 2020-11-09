<template>
  <v-app>
    <LogoSelectorTDS />
    <LogoSelectorCharities />
  </v-app>
</template>

<script>
import LogoSelectorTDS from './components/LogoSelectorTDS.vue';
import LogoSelectorCharities from './components/LogoSelectorCharities.vue';

export default {
  name: 'App',
  components: {
    LogoSelectorCharities,
    LogoSelectorTDS,
  },
};
</script>

<style>

</style>

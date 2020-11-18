<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-icon
        dark
        v-bind="attrs"
        v-on="on"
      >
        mdi-help-circle
      </v-icon>
    </template>
    <span>{{ description }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'SettingHelp',
  props: {
    description: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>

</style>

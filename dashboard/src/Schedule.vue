<template>
  <div id="app">
    <v-app dark>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs6>
            <v-card>
              <v-card-title>
                <div class="md-title">Current</div>
              </v-card-title>

              <v-card-text>
                <v-radio-group v-model="currentSchedType" :mandatory="true">
                  <v-radio label="Game" value="game"></v-radio>
                  <v-radio label="Break" value="break">Break</v-radio>
                  <v-radio label="Other" value="other">Other</v-radio>
                </v-radio-group>

                <small>Model value: {{ currentSchedType }}</small>

                <v-autocomplete
                  v-model="currentGame"
                  :items="gameList"
                  label="Game"
                  item-text="fields.name"
                  item-value="pk"
                ></v-autocomplete>
              </v-card-text>

              <v-card-actions>
                <v-btn>Action</v-btn>
                <v-btn>Action</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>

          <v-flex xs6>
            <v-card>
              <v-card-title>
                <div class="md-title">Next</div>
              </v-card-title>

              <v-card-text>
                <v-radio-group v-model="nextSchedType" :mandatory="true">
                  <v-radio label="Game" value="game"></v-radio>
                  <v-radio label="Break" value="break">Break</v-radio>
                  <v-radio label="Other" value="other">Other</v-radio>
                </v-radio-group>

                <small>Model value: {{ nextSchedType }}</small>
              </v-card-text>

              <v-card-actions>
                <v-btn>Action</v-btn>
                <v-btn>Action</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: () => ({
    currentGame: '',
    currentSchedType: null,
    gameList: [],
    nextSchedType: null
  }),
  mounted: function() {
    let twitchGames = nodecg.Replicant('tds:twitchGames');
    twitchGames.on('change', (newValue) => {
      this.gameList = newValue;
    })
  }
}
</script>

<style>
  small {
    display: block;
  }
</style>

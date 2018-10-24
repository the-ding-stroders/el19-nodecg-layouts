<template>
  <div id="app" class="md-layout md-gutter">
    <div class="md-layout-item">
      <md-card>
        <md-card-header>
          <div class="md-title">Current</div>
        </md-card-header>

        <md-card-content>
          <md-radio v-model="currentSchedType" value="game">Game</md-radio>
          <md-radio v-model="currentSchedType" value="break">Break</md-radio>
          <md-radio v-model="currentSchedType" value="other">Other</md-radio>

          <small>Model value: {{ currentSchedType }}</small>

          <md-autocomplete v-model="currentGame" :md-options="gameList">
            <label>Game</label>
          </md-autocomplete>
        </md-card-content>

        <md-card-actions>
          <md-button>Action</md-button>
          <md-button>Action</md-button>
        </md-card-actions>
      </md-card>
    </div>

    <div class="md-layout-item">
      <md-card>
        <md-card-header>
          <div class="md-title">Next</div>
        </md-card-header>

        <md-card-content>
          <md-radio v-model="nextSchedType" value="game">Game</md-radio>
          <md-radio v-model="nextSchedType" value="break">Break</md-radio>
          <md-radio v-model="nextSchedType" value="other">Other</md-radio>

          <small>Model value: {{ nextSchedType }}</small>
        </md-card-content>

        <md-card-actions>
          <md-button>Action</md-button>
          <md-button>Action</md-button>
        </md-card-actions>
      </md-card>
    </div>
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
  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
  .md-layout-item:after {
    width: 100%;
    height: 100%;
    display: block;
    content: " ";
  }
</style>

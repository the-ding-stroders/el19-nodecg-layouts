<template>
  <div id="app">
    <v-app dark>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs12 align-center justify-center>
            <v-btn
              @click="goPrev()"
              :disabled="currentIndex === 0"
            >
              Previous
            </v-btn>
            <v-btn @click="takeItems()" color="success">Take</v-btn>
            <v-btn
              @click="goNext()"
              :disabled="nextIndex === schedItems.length"
            >
              Next
            </v-btn>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12>
            <v-toolbar dark>
              <v-toolbar-title>Schedule</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" persistent max-width="500px">
                <v-btn slot="activator" dark>
                  <v-icon slot="btnIcon">playlist_add</v-icon>
                  New Item
                </v-btn>
                <v-card>
                  <v-card-title>
                    <span class="headline">Schedule Item</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-form ref="form">
                        <v-layout wrap>
                          <v-flex xs6>
                            <v-radio-group v-model="editedItem.type" :mandatory="true">
                              <v-radio label="Game" value="game"></v-radio>
                              <v-radio label="Break" value="break">Break</v-radio>
                              <v-radio label="Other" value="other">Other</v-radio>
                            </v-radio-group>
                          </v-flex>
                          <v-flex xs12>
                            <v-autocomplete
                              v-if="editedItem.type==='game'"
                              v-model="editedItem.gameId"
                              :items="gameList"
                              label="Game"
                              item-text="fields.name"
                              item-value="pk"
                            ></v-autocomplete>
                            <v-text-field
                              v-if="editedItem.type==='other'"
                              v-model="editedItem.otherName"
                              label="Other Name"
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-form>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="close()">Cancel</v-btn>
                    <v-btn color="success darken-1" @click="save()">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>

            <v-data-table
              hide-headers
              :items="schedItems"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.type }}</td>

                <td v-if="props.item.type==='game'">{{ props.item.gameName }}</td>
                <td v-else-if="props.item.type==='other'">{{ props.item.otherName }}</td>
                <td v-else></td>

                <td class="justify-center layout px-0">
                  <v-icon
                    small
                    class="mr-2"
                    @click="editItem(props)"
                  >
                    edit
                  </v-icon>
                  <v-icon
                    small
                    @click="deleteItem(props)"
                  >
                    delete
                  </v-icon>
                </td>
              </template>
              <template slot="no-data">
                <v-alert
                  type="info"
                >
                  The schedule is empty! Add something pls.
                </v-alert>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    nodecg.readReplicant('tds:schedule', schedule => {
      this.schedItems = schedule;
    });
    nodecg.readReplicant('tds:twitchGames', games => {
      this.gameList = games;
    });
    nodecg.Replicant('tds:schedTake', { defaultValue: {
      'current': 0,
      'next': 1
    }});
    nodecg.readReplicant('tds:schedTake', schedTake => {
      this.currentIndex = schedTake.current;
      this.nextIndex = schedTake.next;
    });
  },
  data: () => ({
    currentIndex: 0,
    defaultItem: {
      gameId: null,
      gameName: null,
      otherName: null,
      type: null
    },
    dialog: false,
    editedIndex: -1,
    editedItem: {
      gameId: null,
      gameName: null,
      otherName: null,
      type: null
    },
    gameList: [],
    nextIndex: 1,
    schedItems: []
  }),
  methods: {
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    deleteItem (schedItem) {
      const schedArr = JSON.parse(JSON.stringify(this.schedItems));
      confirm('Are you sure you want to delete this item?') && schedArr.splice(schedItem.index, 1)
      this.schedItems = schedArr;
    },
    editItem (schedItem) {
      this.editedIndex = schedItem.index;
      this.editedItem = Object.assign({}, schedItem.item)
      this.dialog = true
    },
    goNext() {
      this.currentIndex++;
      this.nextIndex++;

    },
    goPrev() {
      this.currentIndex--;
      this.nextIndex--;
    },
    save () {
      let schedArr = JSON.parse(JSON.stringify(this.schedItems));
      const GAME_LIST_URL = nodecg.bundleConfig.gameListUrl;
      this.$http.get(GAME_LIST_URL + '/' + this.editedItem.gameId).then(response => {
         this.editedItem.gameName = response.body[0].fields.name;
         if (this.editedIndex > -1) {
           Object.assign(this.schedItems[this.editedIndex], this.editedItem)
         } else {
           schedArr.push(this.editedItem)
           this.schedItems = schedArr;
         }
         this.close()
      }, response => {
        if (this.editedIndex > -1) {
          Object.assign(this.schedItems[this.editedIndex], this.editedItem)
        } else {
          schedArr.push(this.editedItem)
          this.schedItems = schedArr;
        }
        this.close()
      })
    },
    takeItems () {
      let schedTakeRep = nodecg.Replicant('tds:schedTake');
      schedTakeRep.value.current = this.currentIndex;
      schedTakeRep.value.next = this.nextIndex;
    },
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    schedItems (items) {
      const schedRep = nodecg.Replicant('tds:schedule');
      schedRep.value = items;
    }
  }
}
</script>

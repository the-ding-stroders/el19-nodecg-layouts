<template>
  <div id="app">
    <v-app>
      <v-container
        grid-list-md
        text-xs-center
      >
        <v-layout
          row
          wrap
        >
          <v-flex
            xs12
            align-center
            justify-center
          >
            <v-btn
              :disabled="currentIndex === 0"
              @click="goPrev()"
            >
              Previous
            </v-btn>
            <v-btn
              color="success"
              @click="takeItems()"
            >
              Take
            </v-btn>
            <v-btn
              :disabled="nextIndex === schedItems.length"
              @click="goNext()"
            >
              Next
            </v-btn>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12>
            <v-toolbar dark>
              <v-toolbar-title>Schedule</v-toolbar-title>
              <v-spacer />
              <v-dialog
                v-model="dialog"
                persistent
                max-width="500px"
              >
                <template #activator="{ on }">
                  <v-btn
                    slot="activator"
                    dark
                    v-on="on"
                  >
                    <v-icon slot="btnIcon">
                      playlist_add
                    </v-icon>
                    New Item
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Schedule Item</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-form ref="form">
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-autocomplete
                              v-model="schedItem.category"
                              :filter="customFilter"
                              :items="items"
                              :loading="isLoading"
                              :search-input.sync="search"
                              :mandatory="true"
                              hide-no-data
                              item-text="name"
                              item-value="_id"
                              label="Twitch Category"
                              placeholder="Start typing to search..."
                              return-object
                            />
                          </v-flex>
                          <v-text-field
                            v-model="schedItem.customTitle"
                            label="Custom Title"
                          />
                        </v-layout>
                      </v-form>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="blue darken-1"
                      text
                      @click.native="close()"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="success darken-1"
                      @click="save()"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>

            <v-data-table
              :headers="headers"
              :items="schedItems"
            >
              <template #body="{ items }">
                <tbody>
                  <tr
                    v-for="(item, index) in items"
                    :key="item.category._id"
                  >
                    <td>{{ item.category.name }}</td>
                    <td v-if="item.customTitle">
                      {{ item.customTitle }}
                    </td>
                    <td v-else />
                    <td v-if="currentIndexLive === index || nextIndexLive === index">
                      <v-chip
                        class="ma-2"
                        :color="getChipColor('live', index)"
                      >
                        {{ getChipText('live', index) }}
                      </v-chip>
                    </td>
                    <td v-else />
                    <!-- eslint-disable-next-line max-len -->
                    <td v-if="currentIndex !== currentIndexLive && (currentIndex === index || nextIndex === index)">
                      <v-chip
                        class="ma-2"
                        :color="getChipColor('deck', index)"
                        outlined
                      >
                        {{ getChipText('deck', index) }}
                      </v-chip>
                    </td>
                    <td v-else />
                    <td class="justify-center layout px-0">
                      <v-icon
                        small
                        class="mr-2"
                        @click="editItem(index)"
                      >
                        edit
                      </v-icon>
                      <v-icon
                        small
                        @click="deleteItem(index)"
                      >
                        delete
                      </v-icon>
                    </td>
                  </tr>
                </tbody>
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
  name: 'App',
  data: () => ({
    categoryEntries: [],
    currentIndex: 0,
    currentIndexLive: 0,
    defaultItem: {
      customTitle: null,
      category: null,
    },
    dialog: false,
    editedIndex: -1,
    headers: [
      {
        text: 'Category',
        value: 'category.name',
      },
      {
        text: 'Custom Title',
        value: 'customTitle',
      },
      {
        text: 'Live?',
      },
      {
        text: 'On Deck?',
      },
      {
        text: 'Actions',
      },
    ],
    isLoading: false,
    nextIndex: 1,
    nextIndexLive: 1,
    schedItem: {
      customTitle: null,
      category: null,
    },
    schedItems: [],
    search: null,
  }),
  computed: {
    items() {
      return this.categoryEntries.map((entry) => ({ ...entry }));
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    schedItems(items) {
      const schedRep = nodecg.Replicant('schedule', 'tds-2020-layouts');
      schedRep.value = items;
    },
    search(val) {
      // No query sent
      if (!val) return;

      this.isLoading = true;
      this.fetchEntriesDebounced(val);
    },
  },
  created() {
    nodecg.readReplicant('schedule', 'tds-2020-layouts', (schedule) => {
      this.schedItems = schedule;
    });
    nodecg.Replicant('schedTake', 'tds-2020-layouts', {
      defaultValue: {
        current: 0,
        next: 1,
      },
    });
    nodecg.readReplicant('schedTake', 'tds-2020-layouts', (schedTake) => {
      this.currentIndex = schedTake.current;
      this.currentIndexLive = schedTake.current;
      this.nextIndex = schedTake.next;
      this.nextIndexLive = schedTake.next;
    });
  },
  methods: {
    close() {
      this.dialog = false;
      this.schedItem = { ...this.defaultItem};
      this.editedIndex = -1;
      this.search = null;
    },
    customFilter(item, queryText) {
      if(queryText < 4) return false;
      return queryText;
    },
    deleteItem(index) {
      const schedArr = JSON.parse(JSON.stringify(this.schedItems));
      confirm('Are you sure you want to delete this item?') && schedArr.splice(index, 1);
      this.schedItems = schedArr;
    },
    editItem(index) {
      this.editedIndex = index;
      this.schedItem = { ...this.schedItems[index]};
      this.search = this.schedItem.category.name;
      this.dialog = true;
    },
    fetchEntries(val) {
      // Load items from Twitch API
      nodecg.sendMessage('searchTwitchCategories', val)
        .then((result) => {
          this.categoryEntries = result;
        }).catch((error) => {
          console.error(error);
        })
        .finally(() => (this.isLoading = false));
    },
    fetchEntriesDebounced(val) {
      clearTimeout(this._searchTimerId);
      this._searchTimerId = setTimeout(() => {
        this.fetchEntries(val);
      }, 500); /* 500ms throttle */
    },
    getChipColor(liveOrDeck, index) {
      if (liveOrDeck === 'deck') {
        if (index === this.currentIndex) {
          return 'rgba(0, 100, 0, 1)'
        } else {
          return 'rgba(255, 140, 0, 1)'
        }
      } else {
        if (index === this.currentIndexLive) {
          return 'rgba(0, 100, 0, 1)'
        } else {
          return 'rgba(255, 140, 0, 1)'
        }
      }
    },
    getChipText(liveOrDeck, index) {
      if (liveOrDeck === 'deck') {
        if (index === this.currentIndex) {
          return 'current'
        } else {
          return 'next'
        }
      } else {
        if (index === this.currentIndexLive) {
          return 'current'
        } else {
          return 'next'
        }
      }
    },
    goNext() {
      this.currentIndex += 1;
      this.nextIndex += 1;
    },
    goPrev() {
      this.currentIndex -= 1;
      this.nextIndex -= 1;
    },
    save() {
      const schedArr = JSON.parse(JSON.stringify(this.schedItems));
      if (this.editedIndex > -1) {
        Object.assign(this.schedItems[this.editedIndex], this.schedItem);
      } else {
        schedArr.push(this.schedItem);
        this.schedItems = schedArr;
      }
      this.close();
    },
    takeItems() {
      const schedTakeRep = nodecg.Replicant('schedTake', 'tds-2020-layouts');
      schedTakeRep.value.current = this.currentIndex;
      this.currentIndexLive = this.currentIndex;
      schedTakeRep.value.next = this.nextIndex;
      this.nextIndexLive = this.nextIndex;
    },
  },
};
</script>

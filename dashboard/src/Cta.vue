<template>
  <!-- eslint-disable vue/valid-v-slot -->
  <div id="app">
    <v-app>
      <v-container
        grid-list-md
        text-xs-center
      >
        <v-form
          ref="form"
          on-submit="return false;"
          @submit.prevent
          @submit="submit"
        >
          <v-layout
            row
            wrap
          >
            <v-flex xs12>
              <v-text-field
                v-model="newContent"
                :counter="140"
                label="Message"
                required
              />
            </v-flex>
          </v-layout>
          <v-layout
            row
            wrap
          >
            <v-flex xs6>
              <v-checkbox
                v-model="newActive"
                label="Active"
              />
            </v-flex>
            <v-flex
              xs6
              align-content-end
            >
              <v-btn @click="clearForm()">
                Clear
              </v-btn>
              <v-btn
                color="success"
                @click="addMessage()"
              >
                Add
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
        <v-layout
          row
          wrap
        >
          <v-flex xs12>
            <v-data-table
              v-model="selected"
              :headers="headers"
              :items="ctaMessages"
              hide-default-footer
              item-key="id"
              show-select
              class="elevation-1"
            >
              <template #item.content="{ item }">
                <td v-if="editingItem.id === item.id">
                  <v-text-field
                    v-model="editingItem.content"
                    label="Message text"
                    placeholder="Message text"
                    single-line
                  />
                </td>
                <td v-else>
                  {{ item.content }}
                </td>
              </template>

              <template #item.active="{ item }">
                <v-checkbox
                  v-if="editingItem.id === item.id"
                  v-model="editingItem.active"
                />
                <v-checkbox
                  v-else
                  v-model="item.active"
                  disabled
                />
              </template>

              <template
                #item.actions="{ item }"
              >
                <v-btn
                  v-if="editingItem.id !== item.id"
                  color="success"
                  :disabled="editingItem.id === item.id || selected.length > 0"
                  @click="editItem(item)"
                >
                  <v-icon dark>
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-btn
                  v-if="editingItem.id !== item.id"
                  color="error"
                  :disabled="editingItem.id === item.id || selected.length > 0"
                  @click="deleteItem(item)"
                >
                  <v-icon dark>
                    mdi-delete
                  </v-icon>
                </v-btn>
                <v-btn
                  v-if="editingItem.id === item.id"
                  color="success"
                  @click="saveItem(item)"
                >
                  <v-icon dark>
                    mdi-check
                  </v-icon>
                  Save
                </v-btn>
                <v-btn
                  v-if="editingItem.id === item.id"
                  @click="closeItem(item)"
                >
                  <v-icon dark>
                    mdi-close-circle
                  </v-icon>
                  Cancel
                </v-btn>
              </template>

              <template #no-data>
                <v-alert
                  type="info"
                >
                  There are no call-to-actions defined.
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
    ctaMessages: [],
    editingItem: {},
    headers: [
      {
        text: 'Message Content',
        sortable: false,
        value: 'content',
      },
      {
        text: 'Active?',
        sortable: false,
        value: 'active',
      },
      {
        text: 'Actions',
        sortable: false,
        value: 'actions',
      },
    ],
    newActive: true,
    newContent: '',
    selected: [],
  }),
  watch: {
    ctaMessages: {
      deep: true,
      handler(newCtaMessage) {
        const ctaRep = nodecg.Replicant('ctamessages', 'tds-2020-layouts', { defaultValue: [] });
        ctaRep.value = newCtaMessage;
      },
    },
  },
  mounted() {
    const vm = this;
    nodecg.Replicant('ctamessages', 'tds-2020-layouts', { defaultValue: [] });
    nodecg.readReplicant('ctamessages', 'tds-2020-layouts', (value) => {
      vm.$data.ctaMessages = value;
    });
  },
  methods: {
    addMessage() {
      const vm = this;
      const today = new Date();
      const year = today.getFullYear();
      const mon = today.getMonth() + 1; // January is 0!
      const date = today.getDate();
      const hr = today.getHours();
      const min = today.getMinutes();
      const sec = today.getSeconds();
      const newID = `${year}-${mon}-${date}-${hr}-${min}-${sec}`;

      const newCTA = {
        active: vm.newActive,
        content: vm.newContent,
        id: newID,
      };
      vm.$data.ctaMessages.push(newCTA);
      vm.clearForm();
    },
    closeItem() {
      const vm = this;

      vm.editingItem = {};
    },
    clearForm() {
      const vm = this;
      vm.$refs.form.reset();
      vm.$data.newActive = true;
    },
    deleteItem(item) {
      const vm = this;
      const itemIndex = this.getItemIndex(item.id);

      vm.ctaMessages.splice(itemIndex, 1);
    },
    editItem(item) {
      const vm = this;
      vm.editingItem = JSON.parse(JSON.stringify(item));
    },
    getItemIndex(itemId) {
      const vm = this;
      return vm.ctaMessages.findIndex((x) => x.id === itemId);
    },
    saveItem(item) {
      const vm = this;
      const itemIndex = this.getItemIndex(item.id);

      Object.assign(vm.ctaMessages[itemIndex], vm.editingItem);
      this.closeItem();
    },
  },
};
</script>

<template>
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
              :headers="headers"
              :items="ctaMessages"
              hide-default-footer
              class="elevation-1"
            >
              <template #items="props">
                <td>{{ props.item.content }}</td>
                <td>{{ props.item.active }}</td>
                <td>{{ props.item.id }}</td>
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
        text: 'ID (Time Created)',
        value: 'id',
      },
    ],
    newActive: true,
    newContent: '',
  }),
  watch: {
    ctaMessages(newCtaMessage) {
      const ctaRep = nodecg.Replicant('ctamessages', 'tds-2020-layouts', { defaultValue: [] });
      ctaRep.value = newCtaMessage;
    },
  },
  mounted() {
    const vm = this;
    nodecg.Replicant('ctamessages', 'tds-2020-layouts', { defaultValue: [] });
    const ctaRep = nodecg.readReplicant('ctamessages', 'tds-2020-layouts', (value) => {
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
    clearForm() {
      const vm = this;
      vm.$refs.form.reset();
      vm.$data.newActive = true;
    },
  },
};
</script>

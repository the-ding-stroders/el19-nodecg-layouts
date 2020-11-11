<template>
  <div id="app">
    <div
      class="toast"
      style="opacity: 0;"
    >
      <div class="title">
        {{ currentToast.title }}
      </div>
      <div class="subtitle">
        {{ currentToast.subtitle }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    currentToast: {},
  }),
  created() {
    nodecg.listenFor('displayToast', 'nodecg-toaster', (toast) => {
      // eslint-disable-next-line no-param-reassign
      delete toast.live;
      this.currentToast = toast;
      this.showToast();
      nodecg.listenFor('hideToast', 'nodecg-toaster', () => {
        this.hideToast();
      });
    });
  },
  methods: {
    showToast() {
      this.$anime.timeline()
        .add({
          targets: '.toast',
          opacity: 1,
          duration: 250,
          easing: 'linear',
        });
    },
    hideToast() {
      const vm = this;
      this.$anime.timeline()
        .add({
          targets: '.toast',
          opacity: 0,
          duration: 250,
          easing: 'linear',
          complete() {
            vm.currentToast = {};
          },
        });
    },
  },
};
</script>

<style>
@font-face {
  font-family: "agencyfb";
  src: url("../fonts/agencyfb-regular.otf");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "agencyfb";
  src: url("../fonts/agencyfb-bold.otf");
  font-weight: bold;
  font-style: normal;
}

.toast {
  font-family: 'agencyfb';
  font-size: 1.7em;
  max-width: 300px;
}

.toast div {
  font-weight: bold;
  padding: 8px;
}

.toast .title {
  background-color: #E8FF51;
  color: #414042;
}
.toast .subtitle {
  background-color: #939598;
  color: #414042;
}
</style>

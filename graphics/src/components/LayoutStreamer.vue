<template>
  <v-flex
    :xs12="size === 12"
    :xs6="size === 6"
    class="mb-4"
  >
    <v-layout row wrap>
      <v-flex xs12 class="pa-1">
        <v-responsive
          :aspect-ratio="16/9"
          class="video-border"
          :max-width="maxWidth"
        ></v-responsive>
      </v-flex>
      <v-flex xs6 class="pl-2 pt-0">
        <v-layout row>
          <v-flex xs1 class="nametag-icon elevation-2">
            <v-icon text-xs-center>{{ tagIcon }}</v-icon>
          </v-flex>
          <v-flex xs5 class="nametag-text">
            {{ tagText }}
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  name: 'LayoutStreamer',
  props: {
    size: {
      type: Number,
      required: true
    },
    streamer: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      maxWidth: null,
      parts: [],
      tagIcon: '',
      tagText: '',
      scrollHoldDuration: 5
    }
  },
  mounted() {
    const vm = this;

    switch(vm.size) {
      case 6:
        vm.maxWidth = 770;
        break;
      case 12:
        vm.maxWidth = 1600;
        break;
    }

    vm.tagIcon = 'far fa-id-card';
    vm.tagText = vm.streamer.name;
    // vm.scrollHoldDuration = nodecg.bundleConfig.nametag.scrollHoldDuration;
    vm.runTimeline();
  },
  methods: {
    processNextPart: function() {
      const vm = this;

      if (vm.parts.length > 0) {
        const part = vm.parts.shift().bind(vm);
        vm.promisifyTimeline(part())
          .then(vm.processNextPart)
          .catch(error => {
            nodecg.log.error('Error when running main loop:', error);
          });
      } else {
        // Start over from the top
        vm.runTimeline();
      }
    },
    promisifyTimeline: function(tl) {
      return new Promise(resolve => {
        tl.call(resolve, null, null, '+=0.03');
      });
    },
    runTimeline() {
      const vm = this;
      let parts = [
        vm.showName
      ]

      if (vm.streamer.twitter) {
        parts.push(vm.showTwitter);
      }
      if (vm.streamer.twitch) {
        parts.push(vm.showTwitch);
      }

      vm.parts = parts;

      vm.processNextPart();
    },
    setContent: function(tl, content) {
      const vm = this;

      tl.to({}, 0.03, {});
      tl.call(() => {
        tl.pause();
        vm.tagIcon = content.icon;
        vm.tagText = content.text;
        tl.resume(null, false);
      });
    },
    showName() {
      const vm = this;
      const scrollHoldDuration = vm.scrollHoldDuration;
      const tl = new TimelineLite();

      tl.to({}, 0.03, {});
      vm.setContent(tl, {
        icon: 'far fa-id-card',
        text: vm.streamer.name
      });
      tl.to({}, scrollHoldDuration, {});

      return tl;
    },
    showTwitter() {
      const vm = this;
      const scrollHoldDuration = vm.scrollHoldDuration;
      const tl = new TimelineLite();

      tl.to({}, 0.03, {});
      vm.setContent(tl, {
        icon: 'fab fa-twitter',
        text: vm.streamer.twitter
      });
      tl.to({}, scrollHoldDuration, {});

      return tl;
    },
    showTwitch() {
      const vm = this;
      const scrollHoldDuration = vm.scrollHoldDuration;
      const tl = new TimelineLite();

      tl.to({}, 0.03, {});
      vm.setContent(tl, {
        icon: 'fab fa-twitch',
        text: vm.streamer.twitch
      });
      tl.to({}, scrollHoldDuration, {});

      return tl;
    }
  }
}
</script>

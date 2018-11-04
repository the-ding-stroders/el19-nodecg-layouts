<template>
  <div class="lower-messages">
    <div class="lower-messages-item">
      <div class="label">{{ message.label }}</div>
      <div class="content">{{ message.content }}</div>
    </div>
  </div>
</template>

<script>
import { TweenMax, TimelineLite } from 'gsap/TweenMax'
import { eachSeries } from 'async-es'

export default {
  name: 'LowerMessages',
  data() {
    return {
      message: {
        content: null,
        label: null
      },
      parts: [],
      contentVisible: false,
      labelVisible: false,
      ctaMessages: [],
      schedule: {
        'current': 'Current',
        'next': 'Next'
      },
      scrollHoldDuration: 5
    }
  },
  created() {
    this.populateSchedule();
  },
  mounted() {
    const vm = this;
    vm.$data.scrollHoldDuration = nodecg.bundleConfig.omnibar.scrollHoldDuration;
    vm.runTimeline();
  },
  methods: {
    visibilityChanged (isVisible, entry) {
      this.isVisible = isVisible
    },
    hideContent: function(tl) {
      tl.to({}, 0.03, {});
      tl.to('.content', 0.5, {
        opacity: 0,
        ease: Linear.ease
      })
      return tl;
    },
    hideLabel: function(tl) {
      const hideLabel = new TimelineLite();

      tl.to({}, 0.03, {});
      tl.to('.label', 0.3, {
        autoAlpha: 0,
        display: "none",
        ease: Linear.ease
      })
      return tl;
    },
    populateMessages: function() {
      const vm = this;

      let ctaRep = nodecg.readReplicant('tds:ctamessages', ctas => {
        vm.$data.ctaMessages = [];
        eachSeries(ctas, (cta, callback) => {
          if (cta.active === true) {
            vm.$data.ctaMessages.push(cta);
          }
          callback();
        }, err => {
          if (err) nodecg.log.error(err);
          return;
        });
      });
    },
    populateSchedule: function() {
      const vm = this;

      nodecg.readReplicant('tds:schedule', schedule => {
        nodecg.readReplicant('tds:schedTake', schedIndexes => {
          const schedCurrent = schedule[schedIndexes.current];
          const schedNext = schedule[schedIndexes.next];

          if (schedCurrent.type === 'game') {
            vm.schedule.current = schedCurrent.gameName;
          } else if (schedCurrent.type === 'other') {
            vm.schedule.current = schedCurrent.otherName;
          } else {
            vm.schedule.current = schedCurrent.type;
          }

          if (schedNext.type === 'game') {
            vm.schedule.next = schedNext.gameName;
          } else if (schedNext.type === 'other') {
            vm.schedule.next = schedNext.otherName;
          } else {
            vm.schedule.next = schedNext.type;
          }
          return;
        });
      });
    },
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
    runTimeline: function() {
      const vm = this;
      vm.populateSchedule();
      vm.populateMessages();
      vm.parts = [
        vm.showCTA,
        vm.showCurrent,
        vm.showUpNext
      ]

      vm.processNextPart();
    },
    setContent: function(tl, text) {
      const vm = this;
      tl.to({}, 0.03, {});
      tl.call(() => {
        tl.pause();
        vm.$data.message.content = text;
        tl.resume(null, false);
      });
    },
    showContent: function(tl) {
      const vm = this;
      const scrollHoldDuration = vm.$data.scrollHoldDuration;
      tl.to({}, 0.03, {});
      tl.to('.content', 0.5, {
        opacity: 1,
        ease: Linear.ease
      })
      tl.to({}, scrollHoldDuration, {});

      return tl;
    },
    showCTA: function(message) {
      const vm = this;
      const tl = new TimelineLite();
      const messages = vm.ctaMessages;

      vm.hideLabel(tl);
      messages.forEach(message => {
        vm.setContent(tl, message.content);
        vm.showContent(tl);
        vm.hideContent(tl);
      });
      return tl;
    },
    showCurrent: function() {
      const vm = this;
      const tl = new TimelineLite();

      vm.setContent(tl, vm.schedule.current);
      vm.showLabel('Now?');
      vm.showContent(tl);
      vm.hideContent(tl);

      return tl;
    },
    showLabel: function(text, color='#6441A4') {
      const vm = this;
      const showLabel = new TimelineLite();
      const scrollHoldDuration = vm.$data.scrollHoldDuration;

      vm.$data.message.label = text;

      showLabel.to({}, 0.03, {});
      showLabel.to('.label', 0.5, {
        backgroundColor: color,
        autoAlpha: 1,
        display: "inline-block",
        ease: Linear.ease
      });
      showLabel.to({}, scrollHoldDuration, {});
      return showLabel;
    },
    showUpNext: function() {
      const vm = this;
      const tl = new TimelineLite();

      vm.setContent(tl, vm.schedule.next);
      vm.showLabel('Next!', '#463f1a');
      vm.showContent(tl);
      vm.hideContent(tl);
      return tl;
    }
  }
}
</script>

<style scoped>
div, /deep/ div {
  display: inline-block;
  height: 100%;
}
.label, /deep/ .label {
  background-color: #6441A4;
  margin: 0px 0 0 -24px;
  padding: 0 10px 0 24px;
  opacity: 0;
}
.content {
  opacity: 0;
}
</style>

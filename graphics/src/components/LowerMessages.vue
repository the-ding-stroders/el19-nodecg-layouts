<template>
  <div class="lower-messages">
    <div class="lower-messages-item">
      <div class="label">
        {{ message.label }}
      </div>
      <div class="content">
        {{ message.content }}
      </div>
    </div>
  </div>
</template>

<script>
import { eachSeries } from 'async-es';
import { gsap } from 'gsap';
import { CSSRulePlugin } from 'gsap/CSSRulePlugin';

export default {
  name: 'LowerMessages',
  data() {
    return {
      message: {
        content: null,
        label: null,
      },
      parts: [],
      contentVisible: false,
      labelVisible: false,
      ctaMessages: [],
      schedule: {
        current: null,
        next: null,
      },
      scrollHoldDuration: 5,
    };
  },
  created() {
    gsap.registerPlugin(CSSRulePlugin);
    this.populateSchedule();
  },
  mounted() {
    const vm = this;
    const ctaRep = nodecg.Replicant('ctamessages');
    const schedRep = nodecg.Replicant('schedule');
    const schedTakeRep = nodecg.Replicant('schedTake');
    vm.$data.scrollHoldDuration = nodecg.bundleConfig.omnibar.scrollHoldDuration;

    // Wait for replicants to load, then start the schedule rotation
    NodeCG.waitForReplicants(ctaRep, schedRep, schedTakeRep).then(() => {
      vm.runTimeline();
    });
  },
  methods: {
    visibilityChanged(isVisible) {
      this.isVisible = isVisible;
    },
    hideContent(tl) {
      tl.to({}, 0.03, {});
      tl.to('.content', 0.5, {
        opacity: 0,
        ease: 'linear',
      });
      return tl;
    },
    hideLabel(tl) {
      const rule = CSSRulePlugin.getRule('.lower-third-grid .messages::before');
      tl.to({}, 0.03, {});
      tl.to('.label', 0.3, {
        autoAlpha: 0,
        display: 'none',
        ease: 'linear',
      });
      tl.to(rule, 0.3, {
        cssRule: {
          backgroundColor: '#939598',
          width: '219px',
        },
        ease: 'linear',
      });
      return tl;
    },
    populateMessages() {
      const vm = this;

      nodecg.readReplicant('ctamessages', 'tds-2020-layouts', (ctas) => {
        vm.$data.ctaMessages = [];
        eachSeries(ctas, (cta, callback) => {
          if (cta.active === true) {
            vm.$data.ctaMessages.push(cta);
          }
          callback();
        }, (err) => {
          if (err) nodecg.log.error(err);
        });
      });
    },
    populateSchedule() {
      const vm = this;

      nodecg.readReplicant('schedule', 'tds-2020-layouts', (schedule) => {
        // Continue if schedule is not completely empty
        if (schedule.length > 0) {
          nodecg.readReplicant('schedTake', 'tds-2020-layouts', (schedIndexes) => {
            const schedCurrent = schedule[schedIndexes.current];
            const schedNext = schedule[schedIndexes.next];

            if (Object.keys(schedCurrent).length >= 0 && schedCurrent.constructor === Object) {
              nodecg.log.info('schedCurrent not empty');
              if (schedCurrent.customTitle) {
                vm.schedule.current = `${schedCurrent.customTitle} (${schedCurrent.category.name})`;
              } else {
                vm.schedule.current = schedCurrent.category.name;
              }
            }

            if (Object.keys(schedNext).length >= 0 && schedNext.constructor === Object) {
              nodecg.log.info('schedNext not empty');
              if (schedNext.customTitle) {
                vm.schedule.next = `${schedNext.customTitle} (${schedNext.category.name})`;
              } else {
                vm.schedule.next = schedNext.category.name;
              }
            }
          });
        }
      });
    },
    processNextPart() {
      const vm = this;

      if (vm.parts.length > 0) {
        const part = vm.parts.shift().bind(vm);
        vm.promisifyTimeline(part())
          .then(vm.processNextPart)
          .catch((error) => {
            nodecg.log.error('Error when running main loop:', error);
          });
      } else {
        // Start over from the top
        vm.runTimeline();
      }
    },
    promisifyTimeline(tl) {
      return new Promise((resolve) => {
        tl.call(resolve, null, null, '+=0.03');
      });
    },
    runTimeline() {
      const vm = this;
      vm.populateSchedule();
      vm.populateMessages();
      vm.parts = [
        vm.showCTA,
      ];

      if (typeof vm.showCurrent === 'undefined' || vm.showCurrent === null) {
        vm.parts.push(vm.showCurrent);
      }

      if (typeof vm.showUpNext === 'undefined' || vm.showUpNext === null) {
        vm.parts.push(vm.showUpNext);
      }

      vm.processNextPart();
    },
    setContent(tl, text) {
      const vm = this;
      tl.to({}, 0.03, {});
      tl.call(() => {
        tl.pause();
        vm.$data.message.content = text;
        tl.resume(null, false);
      });
    },
    showContent(tl) {
      const vm = this;
      const { scrollHoldDuration } = vm.$data;
      tl.to({}, 0.03, {});
      tl.to('.content', 0.5, {
        opacity: 1,
        ease: 'linear',
      });
      tl.to({}, scrollHoldDuration, {});

      return tl;
    },
    showCTA() {
      const vm = this;
      const tl = gsap.timeline();
      const messages = vm.ctaMessages;

      vm.hideLabel(tl);
      messages.forEach((message) => {
        vm.setContent(tl, message.content);
        vm.showContent(tl);
        vm.hideContent(tl);
      });
      return tl;
    },
    showCurrent() {
      const vm = this;
      const tl = gsap.timeline();

      vm.setContent(tl, vm.schedule.current);
      vm.showLabel('Right Now:');
      vm.showContent(tl);
      vm.hideContent(tl);

      return tl;
    },
    showLabel(text, color = '#E8FF51') {
      const vm = this;
      const showLabel = gsap.timeline();
      const rule = CSSRulePlugin.getRule('.lower-third-grid .messages::before');
      const { scrollHoldDuration } = vm.$data;

      vm.$data.message.label = text;

      showLabel.to({}, 0.03, {});
      showLabel.to(rule, 0.3, {
        cssRule: {
          backgroundColor: '#E8FF51',
          width: '210px',
        },
        ease: 'linear',
      });
      showLabel.to('.label', 0.5, {
        autoAlpha: 1,
        display: 'inline-block',
        ease: 'linear',
      });
      showLabel.to({}, scrollHoldDuration, {});
      return showLabel;
    },
    showUpNext() {
      const vm = this;
      const tl = gsap.timeline();

      vm.setContent(tl, vm.schedule.next);
      vm.showLabel('Up Next:', '#E8FF51');
      vm.showContent(tl);
      vm.hideContent(tl);
      return tl;
    },
  },
};
</script>

<style scoped>
div, ::v-deep div {
  display: inline-block;
  height: 100%;
}
.label, ::v-deep .label {
  /* background-color: #E8FF51; */
  /* margin: 0px 0 0 -24px; */
  display: none;
  padding: 0 10px 0 12px;
  opacity: 0;
  width: 172px;
  text-align: center;
  text-transform: uppercase;
}
.content {
  opacity: 0;
  padding-left: 30px;
}
.lower-messages {
  z-index: 2;
  position: relative;
  width: 100%;
}
.lower-messages::before {
  background: #939598;
  width: 1080px;
  content: "";
  top: 0;
  bottom: 0;
  left: 218px;
  position: absolute;
  z-index: -1;
  transform: skewX(195deg);
  transform-origin: bottom;
}

.lower-third-grid .messages::before {
  background: '#939598';
  width: '219px';
}
</style>

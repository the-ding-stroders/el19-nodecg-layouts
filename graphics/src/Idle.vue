<template>
  <div id="app">
    <DonationTotal />
    <div id="container">
      <div id="circle">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="600px"
          height="600px"
          viewBox="0 0 600 600"
          enable-background="new 0 0 600 600"
          xml:space="preserve"
        >
          <defs>
            <path
              id="circlePath"
              d="M 127, 127
                a 242 242, 0 1,1 -1,1"
            />
          </defs>
          <circle
            cx="300"
            cy="300"
            r="300"
            fill="#ffffff"
          />
          <g>
            <use
              xlink:href="#circlePath"
              fill="none"
            />
            <text fill="#000">
              <textPath
                id="idle-message"
                xlink:href="#circlePath"
              >
                {{ idleMessage }}
              </textPath>
            </text>
          </g>
        </svg>
      </div>
    </div>
    <div class="logo-outer">
      <div class="logo-inner">
        <TDSLogo />
      </div>
    </div>
    <div class="charity-outer">
      <p class="charity-label">
        This Stream Benefits:
      </p>
      <div class="charity-inner">
        <CharityLogos />
      </div>
    </div>
    <div class="heart-outer">
      <div class="heart-inner">
        <img src="imgs/heart.png">
      </div>
    </div>
    <div class="lines-for-days">
      <div class="row row-1 yellow">
        <div class="bar size-medium" />
        <div class="bar size-medium" />
        <div class="bar size-small" />
        <div class="bar size-small" />
        <div
          class="bar size-small"
          style="margin-right: 475px;"
        />
        <div class="bar size-small" />
        <div class="bar size-small" />
        <div class="bar size-small" />
        <div class="bar size-medium" />
        <div class="bar size-medium" />
      </div>
      <div class="row row-2 gray">
        <div class="bar size-small" />
        <div class="bar size-small" />
        <div class="bar size-small" />
        <div class="bar size-medium" />
        <div class="bar size-medium" />
        <div class="bar size-large" />
      </div>
      <div class="row row-3 yellow">
        <div class="bar size-medium" />
        <div class="bar size-small" />
        <div class="bar size-small" />
        <div class="bar size-medium" />
        <div class="bar size-small" />
        <div class="bar size-medium short" />
        <div class="bar size-medium short" />
        <div class="bar size-medium short" />
      </div>
      <div class="row row-4 gray">
        <div class="bar size-small" />
        <div class="bar size-small" />
        <div class="bar size-small" />
        <div class="bar size-medium" />
        <div class="bar size-medium" />
      </div>
      <div class="row row-5 yellow">
        <div class="bar size-medium" />
        <div class="bar size-small" />
        <div class="bar size-small" />
        <div class="bar size-medium" />
      </div>
      <div class="row row-6 gray">
        <div class="bar size-medium" />
        <div class="bar size-medium" />
        <div class="bar size-medium" />
      </div>
      <div class="row row-7 yellow">
        <div class="bar size-medium" />
        <div class="bar size-medium" />
        <div class="bar size-medium" />
        <div class="bar size-small" />
        <div class="bar size-small" />
        <div class="bar size-small" />
      </div>
      <div class="row row-8 gray">
        <div class="bar size-large" />
        <div class="bar size-medium" />
        <div class="bar size-medium" />
        <div class="bar size-small" />
        <div class="bar size-small" />
        <div
          class="bar size-small"
          style="margin-right: 156px;"
        />
        <div class="bar size-small" />
        <div class="bar size-small" />
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import CharityLogos from './components/CharityLogos.vue';
import DonationTotal from './components/DonationTotal.vue';
import TDSLogo from './components/TDSLogo.vue';

export default {
  name: 'App',
  components: {
    CharityLogos,
    DonationTotal,
    TDSLogo,
  },
  data: () => ({
    idleMessage: '',
  }),
  created() {
    const vm = this;
    const settingsRep = nodecg.Replicant('settings');

    NodeCG.waitForReplicants(settingsRep).then(() => {
      vm.idleMsg = settingsRep.value.idleScreenMsg.value;

      settingsRep.on('change', (newValue) => {
        vm.idleMessage = newValue.idleScreenMsg.value;
      });
    });
  },
  mounted() {
    const vm = this;
    const settingsRep = nodecg.Replicant('settings');

    NodeCG.waitForReplicants(settingsRep).then(() => {
      vm.idleMsg = settingsRep.value.idleScreenMsg.value;

      settingsRep.on('change', (newValue) => {
        vm.idleMessage = newValue.idleScreenMsg.value;

        // eslint-disable-next-line no-undef
        jQuery('#circle').fitText(3);
      });
    });

    vm.rotateHeart();
    vm.animateLines();
  },
  methods: {
    animateLines() {
      const vm = this;
      vm.driveRowAcross('.row-1');
      vm.driveRowAcross('.row-2', true);
    },
    driveRowAcross(element, reverse = false) {
      let sourceOperator = '-';
      let copyOperator = '+';
      const linesContainer = document.querySelector('.lines-for-days');
      const lineSource = document.querySelector(element);
      const lineCopy = lineSource.cloneNode(true);
      const timeline = gsap.timeline({ paused: true });

      if (reverse) {
        sourceOperator = '+';
        copyOperator = '-';
      }

      linesContainer.appendChild(lineCopy);
      lineSource.classList.add('driving');
      lineCopy.classList.add('driving');

      timeline.set(lineCopy, { x: `${copyOperator}=100%` });
      timeline.to(element, {
        duration: 60,
        ease: 'none',
        repeat: -1,
        x: `${sourceOperator}=100%`,
      });
      timeline.play();
    },
    rotateHeart() {
      const element = '.heart-inner img';
      const minRotate = 2;
      const maxRotate = 5;
      const minTime = 15;
      const maxTime = 30;
      const randomTime = Math.floor(Math.random() * (maxTime - minTime + 1) + minTime);
      const rotations = Math.floor(Math.random() * (maxRotate - minRotate + 1) + minRotate);
      const timeline = gsap.timeline({ paused: true });
      const vm = this;

      timeline.set(element, { rotationY: 0 });
      timeline.to(element, {
        duration: 0.25,
        y: 15,
      });
      timeline.to(element, {
        duration: 1,
        ease: 'elastic.out(1.5, 0.5)',
        y: 0,
      });
      timeline.to(element, {
        rotateY: 360 * rotations,
        duration: 2,
        ease: 'power4.easeInOut',
      }, '-=0.95');
      timeline.play();

      setTimeout(vm.rotateHeart, randomTime * 1000);
    },
  },
};
</script>

<style>
#app {
  font-family: 'agencyfb';
  font-weight: bold;
  width: 1920px;
  height: 1080px;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  background-color: #414042;
  justify-content: center;
  align-items: center;
}
.lines-for-days {
  display: grid;
  grid-template-columns: 960px 960px;
  grid-template-rows: 36px 35px 36px 37px 134px 87px 36px 35px 134px 98px 36px 47px 134px 37px 36px;
  width: 100%;
  z-index: 1;
  box-sizing: border-box;
  overflow: hidden;
}
.row {
  white-space: nowrap;
  margin-left: -18px;
}
.row-1 {
  grid-row-start: 1;
  height: 36px;
}
.row-2 {
  grid-row-start: 3;
  height: 36px;
  padding-left: 215px;
  top: 130px;
}
.row-3 { grid-row-start: 5; }
.row-4 {
  grid-row-start: 7;
  margin-right: -290px;
}
.row-5 {
  grid-row-start: 9;
  margin-right: -50px;
}
.row-6 {
  grid-row-start: 11;
  margin-right: -150px;
}
.row-7 { grid-row-start: 13; }
.row-8 {
  grid-row-start: 15;
  margin-left: -80px;
}
.row-4, .row-5, .row-6 {
  grid-column-start: 2;
  margin-left: 0px;
  text-align: right;
}
.row .bar {
  display: inline-block;
  position: relative;
  height: 100%;
  transform: skewX(195deg);
  margin-right: 25px;
}
.row .bar.size-small {
  width: 28px;
}
.row .bar.size-medium {
  width: 350px;
}
.row .bar.size-large {
  width: 835px;
}
.row .bar.short {
  height: 36px;
}
.row.gray .bar {
  background: #939598;
}
.row.yellow .bar {
  background: #E8FF51;
}
.row.driving {
  position: absolute;
}
.charity-outer, .heart-outer, .logo-outer {
  position: absolute;
}
.charity-outer {
  left: 760px;
  top: 456px;
  width: 390px;
  z-index: 12;
}
.charity-label {
  color: #777777;
  font-size: 2em;
  margin: 0 0 4px 0;
  text-align: center;
}
.heart-outer {
  right: 104px;
  bottom: 32px;
  height: 104px;
}
.logo-outer {
  left: 0;
  height: 330px;
  width: 550px;
  top: 410px;
  margin-left: 40px;
}
.charity-inner, .heart-inner, .logo-inner {
  height: 100%;
  width: 100%;
  text-align: center;
}
.charity-inner img, .heart-inner img, .logo-inner img {
  max-width: 100%;
  max-height: 100%;
}
.total-amount {
  bottom: 160px;
  font-size: 4em;
  position: absolute;
  right: 200px;
}
.total-amount, .total-amount .odometer {
  color: #ffffff;
  font-family: 'agencyfb';
  font-weight: bold;
}
#container {
  margin: 0%;
  width: 1920px;
  height: 1080px;
  position: absolute;
  z-index: 11;
}
#circle {
  color: #414042;
  letter-spacing: 0.02em;
  overflow: hidden;
  padding-bottom: 100%;
  position: relative;
  width: 100%;
  word-spacing: 0.2em;
}
#circle svg {
  border: solid 32px #414042;
  border-radius: 50%;
  position: absolute;
  left: 630px;
  top: 205px;
  width: 600px;
  height: 600px;
  -webkit-animation-name: rotate;
     -moz-animation-name: rotate;
      -ms-animation-name: rotate;
       -o-animation-name: rotate;
          animation-name: rotate;
  -webkit-animation-duration: 30s;
     -moz-animation-duration: 30s;
      -ms-animation-duration: 30s;
       -o-animation-duration: 30s;
          animation-duration: 30s;
  -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
      -ms-animation-iteration-count: infinite;
       -o-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
      -ms-animation-timing-function: linear;
       -o-animation-timing-function: linear;
          animation-timing-function: linear;
}
@-webkit-keyframes rotate {
    from { -webkit-transform: rotate(360deg); }
    to { -webkit-transform: rotate(0); }
}
@-moz-keyframes rotate {
    from { -moz-transform: rotate(360deg); }
    to { -moz-transform: rotate(0); }
}
@-ms-keyframes rotate {
    from { -ms-transform: rotate(360deg); }
    to { -ms-transform: rotate(0); }
}
@-o-keyframes rotate {
    from { -o-transform: rotate(360deg); }
    to { -o-transform: rotate(0); }
}
@keyframes rotate {
    from { transform: rotate(360deg); }
    to { transform: rotate(0); }
}
</style>

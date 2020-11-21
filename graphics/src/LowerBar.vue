<template>
  <div id="app">
    <div class="lower-third-grid">
      <div class="logo-outer lt-container">
        <div class="logo-inner">
          <TDSLogo />
        </div>
      </div>
      <div class="donations lt-container">
        <DonationAlert />
        <DonationsList />
      </div>
      <div class="charities lt-container">
        <CharityLogos />
        <div class="arrow-down" />
      </div>
      <div class="messages lt-container">
        <LowerMessages />
      </div>
      <div class="total lt-container">
        <DonationTotal show-goal />
      </div>
    </div>
  </div>
</template>

<script>
import CharityLogos from './components/CharityLogos.vue';
import DonationsList from './components/DonationsList.vue';
import DonationAlert from './components/DonationAlert.vue';
import DonationTotal from './components/DonationTotal.vue';
import LowerMessages from './components/LowerMessages.vue';
import TDSLogo from './components/TDSLogo.vue';

export default {
  name: 'LowerBar',
  components: {
    CharityLogos,
    DonationAlert,
    DonationsList,
    DonationTotal,
    LowerMessages,
    TDSLogo,
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

#app {
  width: 1920px;
  /* height: 1080px; */
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  overflow: hidden;
}
.lower-third-grid {
  display: grid;
  grid-template-columns: 280px 1296px 321px;
  grid-template-rows: 76px 66px;
  grid-template-areas:
        "logo-outer donations charities"
        "logo-outer messages total";
  grid-column-gap: 8px;
  grid-row-gap: 8px;

  width: 100%;
  z-index: 6;
  font-family: 'agencyfb';
  font-weight: bold;
  background-color: #414042;
  color: #414042;
  box-sizing: border-box;
  overflow: hidden;
}
.logo-outer { grid-area: logo-outer; }
.donations { grid-area: donations; }
.charities { grid-area: charities; }
.messages { grid-area: messages; }
.total { grid-area: total; }

.lower-third-grid .logo-outer {
  display: inline-block;
  z-index: 10;
  height: 150px;
  width: 280px;
  position: relative;
  /* left: -35px; */
  top: 0;
  /* transform: skew(-25deg, 0); */
  overflow: hidden;
  /* padding-right: 10px; */
}
.lower-third-grid .logo-outer .logo-inner {
  background: #fff;
  border: solid 8px #414042;
  border-radius: 50%;
  height: 115px;
  line-height: 115px;
  padding: 10px;
  width: 115px;
  margin: 0 auto;
}
.lower-third-grid .logo-outer::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(#414042 56%, #E8FF51 56%);
  width: 280px;
  transform: skewX(195deg);
  transform-origin: bottom;
  z-index: -1;
}
.lower-third-grid .logo-outer .logo-inner img {
  display: inline;
  max-height: 100%;
  max-width: 100%;
  vertical-align: middle;
  /* transform: skew(25deg, 0); */
}
.lower-third-grid .donations {
  color: #F1F2F2;
  display: inline-block;
  font-weight: normal;
  overflow: hidden;
  /* margin-left: -32px; */
  padding-right: 20px;
  position: relative;
  margin-left: -66px;
}
.lower-third-grid .messages {
  /* background: #939598; */
  display: inline-block;
  bottom: 0;
  height: 100%;
  line-height: 66px;
  font-size: 42px;
  position: relative;
  /* margin: 0 0 0 -20px; */
}
.lower-third-grid .messages::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background: #E8FF51;
  width: 210px;
  transform: skewX(195deg);
  transform-origin: bottom;
  z-index: 0;
}
.lower-third-grid .charities {
  background: #ffffff;
  text-align: center;
  padding: 6px;
  margin-right: 20px;
}
.lower-third-grid .charities::before {
  background: linear-gradient(#FFF 55%, #FFF0 55%);
  content: "";
  top: 0;
  bottom: 0;
  right: -40px;
  position: absolute;
  z-index: 6;
  transform: skewX(195deg);
  transform-origin: bottom;
  width: 368px;
  margin-bottom: 12px;
}
.lower-third-grid .charities img {
  max-width: 100%;
  max-height: 100%;
  /* transform: skew(25deg, 0); */
  z-index: 6;
  position: relative;
}
.lower-third-grid .charities .arrow-down {
  width: 0;
  height: 0;
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
  border-top: 20px solid #fff;
  position: absolute;
  z-index: 99;
  right: 130px;
  top: 76px;
  filter: drop-shadow(0px 4px 2px #1111112f);
}
.lower-third-grid .total {
  /* background: #E8FF51; */
  position: relative;
}
.lower-third-grid .total::before {
  background: #E8FF51;
  width: 346px;
  content: "";
  top: 0;
  bottom: 0;
  left: 3px;
  position: absolute;
  z-index: 0;
  transform: skewX(195deg);
  transform-origin: bottom;
}
.lower-third-grid .total .total-amount {
  color: #939598;
  font-size: 40px;
  text-align: center;
  height: 100%;
  line-height: 66px;
  position: relative;
  z-index: 3;
}
.lower-third-grid .total .total-amount .dollar-sign {
  color: #414042;
}
.lower-third-grid .total .odometer {
  color: #414042;
  font-family: 'agencyfb';
  font-weight: bold;
}
</style>

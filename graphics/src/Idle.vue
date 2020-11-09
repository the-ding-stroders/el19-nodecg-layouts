<template>
  <div id="app">
    <div class="text-circle" />
    <div class="logo-outer">
      <div class="logo-inner">
        <TDSLogo />
      </div>
    </div>
    <div class="charity-outer">
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
import CharityLogos from './components/CharityLogos.vue';
import TDSLogo from './components/TDSLogo.vue';

export default {
  name: 'App',
  components: {
    CharityLogos,
    TDSLogo,
  },
};
</script>

<style>
#app {
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
  grid-template-columns: 1920px;
  grid-template-rows: 36px 35px 36px 37px 134px 87px 36px 35px 134px 98px 36px 47px 134px 37px 36px;
  /* grid-column-gap: 8px; */
  /* grid-row-gap: 10px; */
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
  margin-left: -80px;
}
.row-2 {
  grid-row-start: 3;
  padding-left: 215px;
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
.text-circle {
  width: 600px;
  height: 600px;
  background: #fff;
  border-radius: 50%;
  margin: auto;
  position: absolute;
  z-index: 10;
  border: solid 32px #414042;
}
.charity-outer, .heart-outer, .logo-outer {
  position: absolute;
}
.charity-outer {
  right: 0;
  height: 136px;
  width: 580px;
  bottom: 133px;
  margin-right: 40px;
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
</style>

<template>
  <div id="dotfall" />
</template>

<script>
import { gsap } from 'gsap';

export default {
  name: 'DotFall',
  mounted() {
    const vm = this;
    vm.snowfall();
  },
  methods: {
    snowfall() {
      const warp = document.getElementById('dotfall');
      const w = window.innerWidth;
      const h = window.innerHeight;
      const totalFlakes = 150;

      gsap.set('#dotfall', { perspective: 600 });

      function R(min, max) { return min + Math.random() * (max - min); }

      function animm(elm) {
        gsap.to(elm, R(10, 15), {
          y: h + 100, repeat: -1, delay: -15,
        });
        gsap.to(elm, R(4, 7), {
          x: '+=100', rotationZ: R(0, 720), repeat: -1, yoyo: true, ease: 'sine.easeInOut',
        });
        gsap.to(elm, R(5, 7), {
          x: '+=100', repeat: -1, yoyo: true, ease: 'sine.easeInOut',
        });
      }

      for (let i = 0; i < totalFlakes; i += 1) {
        const Div = document.createElement('div');
        const minIndex = 1;
        const maxIndex = 10;
        const randomIndex = Math.floor(Math.random() * (maxIndex - minIndex + 1) + minIndex);
        Div.style.zIndex = randomIndex;
        gsap.set(Div, {
          attr: { class: 'dot winter' }, x: R(0, w), y: R(-200, -150), z: R(-200, 200),
        });
        warp.appendChild(Div);
        animm(Div);
      }
    },
  },
};
</script>

<style>
  #dotfall {
    position: absolute;
    height: 100%;
    width: 100%;
  }
  .dot {
    width:35px;
    height:35px;
    position:absolute;
    background-size: 30% 30%;
    background-repeat: no-repeat;
  }
  .winter {
    background-image: url('../../imgs/snow.png');
  }
</style>

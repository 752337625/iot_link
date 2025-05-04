<script setup lang="ts">
import { nextTick } from 'vue';

import Pickr from '@simonwep/pickr';

const props = defineProps({
  color: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['save']);
nextTick(() => {
  const pickr = new Pickr({
    el: '#is-packr',
    theme: 'monolith',
    default: props.color,
    defaultRepresentation: 'RGBA',
    comparison: false,
    outputPrecision: 0,
    swatches: [
      'rgba(244, 67, 54, 1)',
      'rgba(233, 30, 99, 0.95)',
      'rgba(156, 39, 176, 0.9)',
      'rgba(103, 58, 183, 0.85)',
      'rgba(63, 81, 181, 0.8)',
      'rgba(33, 150, 243, 0.75)',
      'rgba(3, 169, 244, 0.7)',
      'rgba(0, 188, 212, 0.7)',
      'rgba(0, 150, 136, 0.75)',
      'rgba(76, 175, 80, 0.8)',
      'rgba(139, 195, 74, 0.85)',
      'rgba(205, 220, 57, 0.9)',
      'rgba(255, 235, 59, 0.95)',
      'rgba(255, 193, 7, 1)',
    ],

    components: {
      opacity: true, // Display opacity slider
      hue: true, // Display hue slider
      interaction: {
        input: true,
        clear: true,
      },
    },
  });
  pickr
    .on('clear', () => {
      emit('save', { [props.type]: undefined });
    })
    .on('change', (color: any) => {
      emit('save', { [props.type]: color.toRGBA().toString(0) });
    });
});
</script>
<template>
  <p id="is-packr" class="w-5"></p>
</template>
<style lang="scss">
@import '@simonwep/pickr/dist/themes/monolith.min.css'; // 'monolith' theme
</style>

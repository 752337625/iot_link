<script setup lang="ts">
import { onMounted, ref } from 'vue';

const page = ref<boolean>(false);
// gif\svg\图片\Path-XXX\Pipe-XXX
onMounted(() => {
  window._IOT_FABRIC_.$$.on('selection:created', () => {
    const activeObject = window._IOT_FABRIC_.getActiveObject();
    page.value = activeObject.type !== 'activeselection';
  });
  window._IOT_FABRIC_.$$.on('selection:updated', () => {
    const activeObject = window._IOT_FABRIC_.getActiveObject();
    page.value = activeObject.type !== 'activeselection';
  });
  window._IOT_FABRIC_.$$.on('selection:cleared', () => {
    page.value = false;
  });
});
</script>
<template>
  <div>6666</div>
</template>

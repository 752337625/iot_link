<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import CanvasPage from '../right-page/canvas-page/index.vue';
import ObjectPage from '../right-page/object-page/index.vue';

const page = ref<boolean>(false);
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
  <div class="bg-background text-foreground h-full overflow-y-auto p-2">
    <component :is="page ? ObjectPage : CanvasPage" />
  </div>
</template>

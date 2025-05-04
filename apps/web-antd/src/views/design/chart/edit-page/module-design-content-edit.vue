<script setup lang="ts">
import { onMounted } from 'vue';

import {
  FabricBackgroundClass,
  FabricDragLayoutClass,
  FabricGridClass,
  FabricRanderClass,
  FabricZoomClass,
} from '@vben/fabric';

const initRender = () => {
  window._IOT_FABRIC_ = new FabricRanderClass('goJsRef', 'cavans-edit');
  window._IOT_FABRIC_GRID_ = new FabricGridClass(window._IOT_FABRIC_);
  window._IOT_FABRIC_BG_ = new FabricBackgroundClass(window._IOT_FABRIC_);
  window._IOT_FABRIC_DRAG_LAYOUT_ = new FabricDragLayoutClass(
    window._IOT_FABRIC_,
  );
  window._IOT_FABRIC_ZOOM_ = new FabricZoomClass(window._IOT_FABRIC_);

  window._IOT_FABRIC_.bindingPlugins([
    window._IOT_FABRIC_DRAG_LAYOUT_,
    window._IOT_FABRIC_ZOOM_,
    window._IOT_FABRIC_GRID_,
    window._IOT_FABRIC_BG_,
  ]);
};
onMounted(() => initRender());
</script>
<template>
  <div id="cavans-edit" class="h-full w-full">
    <canvas id="goJsRef"></canvas>
  </div>
</template>

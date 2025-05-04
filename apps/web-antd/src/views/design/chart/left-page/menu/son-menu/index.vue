<script lang="ts" setup>
import { computed } from 'vue';

import { useNamespace } from '@vben/hooks';

import { useChartLayoutLeftStore } from '#/store/chartLayoutLeftStore/chartLayoutLeftStore';

const { b, e, is } = useNamespace('left-menu');

const chartLayoutStore = useChartLayoutLeftStore();

const getComponentList = computed(() => chartLayoutStore.getComponentSonList);
</script>
<template>
  <ul
    class="is-light"
    :class="[b()]"
    style="border-right: 1px solid hsl(var(--border))"
  >
    <li
      v-for="(item, index) in getComponentList"
      :key="item.title"
      :class="[is('active', item.active), e('item')]"
      class="wow animate__animated animate__zoomIn hvr-glow flex h-8 w-full cursor-pointer flex-col items-center justify-center rounded-sm text-center"
      @click="chartLayoutStore.setComponentInfo(index, 'sonMenu')"
    >
      <p class="scale-90 select-none text-xs">
        {{ item.title }}
      </p>
    </li>
  </ul>
</template>

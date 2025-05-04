<script lang="ts" setup>
import { computed } from 'vue';

import { usePreferences } from '@vben/preferences';

import { useChartLayoutLeftStore } from '#/store/chartLayoutLeftStore/chartLayoutLeftStore';

import Corners from './components/corners.vue';

const { isDark } = usePreferences();
const chartLayoutStore = useChartLayoutLeftStore();

const getComponentList = computed(() => chartLayoutStore.getComponentGrandList);
const onDragStart = (event: DragEvent, item: Record<string, any>) => {
  event.dataTransfer?.setData('component', JSON.stringify(item));
  (event.dataTransfer as DataTransfer).effectAllowed = 'copyMove';
  (event.dataTransfer as DataTransfer).dropEffect = 'move';
};
const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  (event.dataTransfer as DataTransfer).effectAllowed = 'copyMove';
  (event.dataTransfer as DataTransfer).dropEffect = 'move';
};
</script>
<template>
  <ul>
    <li
      v-for="item in getComponentList"
      :key="item.title"
      class="wow animate__animated animate__flipInX mb-1.5 w-full"
    >
      <Corners class="is-active left-grand-menu is-light">
        <template #default>
          <span class="scale-90 select-none text-xs">{{ item.title }}</span>
        </template>
      </Corners>
      <div
        :class="[isDark ? 'is-dark is-active' : '']"
        :draggable="true"
        class="left-grand-menu flex h-16 w-full cursor-pointer justify-center rounded-b-lg p-2"
        style="background-color: #f2f3f5"
        @dragover="onDragOver"
        @dragstart="onDragStart($event, item)"
      >
        <img :alt="item.title" :delay="500" class="h-full" v-lazy="item.src" />
      </div>
    </li>
  </ul>
</template>
<style lang="scss" scoped>
$namespace: left;

@mixin left-active {
  color: var(--menu-item-active-color);
  background: var(--menu-item-active-background-color) !important;
}
.#{$namespace}-grand-menu {
  &.is-dark {
    --menu-item-active-color: hsl(var(--accent-foreground));
    --menu-item-active-background-color: hsl(var(--accent));
  }

  &.is-light {
    --menu-item-active-color: hsl(var(--primary));
    --menu-item-active-background-color: hsl(var(--primary) / 15%);
  }

  &.is-active {
    @include left-active;
  }
}
</style>

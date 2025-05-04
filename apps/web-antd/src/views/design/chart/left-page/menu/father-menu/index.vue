<script lang="ts" setup>
import { computed } from 'vue';

import { useNamespace } from '@vben/hooks';

import { useChartLayoutLeftStore } from '#/store/chartLayoutLeftStore/chartLayoutLeftStore';

const { b, e, is } = useNamespace('left-menu');

const chartLayoutStore = useChartLayoutLeftStore();

const getComponentList = computed(() => chartLayoutStore.componentList);
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
      class="wow animate__animated animate__zoomIn hvr-glow flex h-16 w-full cursor-pointer flex-col items-center justify-center rounded-sm text-center"
      @click="chartLayoutStore.setComponentInfo(index, 'fatherMenu')"
    >
      <span :class="[item.icon]" class="mb-1 text-xl"></span>
      <p class="scale-90 select-none text-sm">
        {{ item.title }}
      </p>
    </li>
  </ul>
</template>
<style lang="scss">
$namespace: vben;

@mixin left-active {
  color: var(--menu-item-active-color);
  background: var(--menu-item-active-background-color);
}
.#{$namespace}-left-menu {
  &.is-dark {
    --menu-item-active-color: hsl(var(--accent-foreground));
    --menu-item-active-background-color: hsl(var(--accent));
  }

  &.is-light {
    --menu-item-active-color: hsl(var(--primary));
    --menu-item-active-background-color: hsl(var(--primary) / 15%);
  }

  .is-active {
    @include left-active;
  }
}
</style>

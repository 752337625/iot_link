<script lang="ts" setup>
import { computed } from 'vue';

import { usePreferences } from '@vben/preferences';

import { Mousewheel, Pagination, Scrollbar, Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import { useChartLayoutLeftStore } from '#/store/chartLayoutLeftStore/chartLayoutLeftStore';

import Corners from './components/corners.vue';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/virtual';

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
  <!-- <ul>
    <li
      v-for="(item, index) in getComponentList"
      :key="item.title"
      :data-wow-delay="`${index * 60}ms`"
      class="wow animate__animated animate__flipInX mb-1.5 w-full"
    >

    </li>
  </ul> -->
  <Swiper
    :modules="[Pagination, Scrollbar, Mousewheel, Virtual]"
    direction="vertical"
    slides-per-view="auto"
    :scrollbar="true"
    :mousewheel="true"
    :virtual="false"
    :pagination="{
      type: 'fraction',
    }"
  >
    <SwiperSlide
      v-for="(item, index) in getComponentList"
      :key="item.title"
      :virtual-index="index"
      class="animate__animated animate__flipInX !h-28 px-1"
    >
      <Corners class="is-active left-grand-menu is-light">
        <template #default>
          <span class="scale-90 select-none text-xs">{{ item.title }}</span>
        </template>
      </Corners>
      <div
        :class="[isDark ? 'is-dark is-active' : '']"
        :draggable="true"
        class="left-grand-menu flex h-20 w-full cursor-pointer justify-center rounded-b-lg p-2"
        style="background-color: #f2f3f5"
        @dragover="onDragOver"
        @dragstart="onDragStart($event, item)"
      >
        <img :alt="item.title" class="h-full" v-lazy="item.src" />
      </div>
    </SwiperSlide>
  </Swiper>
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

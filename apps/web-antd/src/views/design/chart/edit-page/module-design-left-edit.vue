<script lang="ts" setup>
import { computed } from 'vue';

import { useChartLayoutLeftStore } from '#/store/chartLayoutLeftStore/chartLayoutLeftStore';

import Double from '../left-page/double/index.vue'; // 显影、父类
import FatherMenu from '../left-page/menu/father-menu/index.vue'; // 显影、父类
import GrandMenu from '../left-page/menu/grand-menu/index.vue'; // 搜索、子类
import SonMenu from '../left-page/menu/son-menu/index.vue'; // 搜索、子类
import Search from '../left-page/search/index.vue'; // 搜索、子类

const chartLayoutLeftStore = useChartLayoutLeftStore();

const getLayoutLeftItemShow = computed(
  () => chartLayoutLeftStore.getLayoutLeftItemShow,
);
</script>
<template>
  <div class="bg-background text-foreground flex h-full">
    <!-- 显影、父类 -->
    <div class="h-full" style="width: 40px">
      <Double class="h-[40px] w-full leading-10" />
      <FatherMenu
        class="w-full overflow-x-hidden p-0.5"
        style="height: calc(100% - 40px)"
      />
    </div>
    <!-- 搜索、子类 -->
    <div
      :class="[getLayoutLeftItemShow ? 'opacity-100' : 'opacity-0']"
      :style="[
        {
          width: getLayoutLeftItemShow ? '175px' : 0,
          transition: 'width 0.3s ease-in-out,opacity 0.1s ease-in-out',
        },
      ]"
      class="h-full"
    >
      <Search
        class="h-[40px] w-full leading-10"
        style="border-bottom: 1px solid hsl(var(--border))"
      />
      <div
        class="flex w-full overflow-hidden"
        style="height: calc(100% - 40px)"
      >
        <SonMenu style="width: 60px" class="h-full overflow-x-hidden p-0.5" />
        <GrandMenu class="flex-1 p-1" />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.hvr-glow:hover,
.hvr-glow:focus,
.hvr-glow:active {
  box-shadow: 0 0 8px rgb(0 0 0 / 60%);
}
</style>

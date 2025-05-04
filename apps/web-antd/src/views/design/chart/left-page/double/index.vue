<script lang="ts" setup>
import { computed } from 'vue';

import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons-vue';

import { useChartLayoutLeftStore } from '#/store/chartLayoutLeftStore/chartLayoutLeftStore';

const chartLayoutLeftStore = useChartLayoutLeftStore();

const getLayoutLeftItemShow = computed(
  () => chartLayoutLeftStore.getLayoutLeftItemShow,
);
</script>
<template>
  <div
    class="text-center"
    style="
      border-right: 1px solid hsl(var(--border));
      border-bottom: 1px solid hsl(var(--border));
    "
  >
    <template v-if="!getLayoutLeftItemShow">
      <DoubleRightOutlined
        class="wow animate__animated animate__backInRight cursor-pointer"
        @click="chartLayoutLeftStore.setLayoutLeftItemShow(true)"
      />
    </template>
    <template v-else>
      <DoubleLeftOutlined
        class="wow animate__animated animate__backInLeft ursor-pointer"
        @click="chartLayoutLeftStore.setLayoutLeftItemShow(false)"
      />
    </template>
  </div>
</template>

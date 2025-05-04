<script lang="ts" setup>
import { ref, watchEffect } from 'vue';

import {
  EchartsUI,
  type EchartsUIType,
  useEcharts,
} from '@vben/plugins/echarts';

const prorps = defineProps({
  machineServerDisk: {
    type: Object,
    default: () => ({ availableFreeSpace: '0', used: '0' }),
  },
});
const chartRef = ref<EchartsUIType>();
const { renderEcharts } = useEcharts(chartRef);

watchEffect(() => {
  renderEcharts({
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        name: '内存使用率',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 30,
            fontWeight: 'bold',
          },
        },
        data: [
          {
            value: prorps.machineServerDisk.used,
            name: '已使用',
            itemStyle: {
              color: '#b6a2de',
            },
            label: {
              show: true,
              formatter: (v) => {
                return `${v.name}-${v.value}GB`;
              },
            },
          },
          {
            value: prorps.machineServerDisk.availableFreeSpace,
            name: '剩余',
            itemStyle: {
              color: 'rgb(1, 191, 236)',
            },
            label: {
              show: true,
              formatter: (v) => {
                return `${v.name}-${v.value}GB`;
              },
            },
          },
        ],
      },
    ],
  });
});
</script>

<template>
  <EchartsUI ref="chartRef" />
</template>

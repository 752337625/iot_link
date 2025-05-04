<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';

import {
  EchartsUI,
  type EchartsUIType,
  useEcharts,
} from '@vben/plugins/echarts';

const prorps = defineProps({
  machineUseInfo: {
    type: Object,
    default: () => ({ usedRam: '0', freeRam: '0' }),
  },
});
const chartRef = ref<EchartsUIType>();
const { renderEcharts } = useEcharts(chartRef);
const regex = /\d+(\.\d+)?/;
const data = reactive({
  usedRam: 0,
  freeRam: 0,
});
watch(
  () => prorps.machineUseInfo,
  (val) => {
    data.usedRam = Number(val.usedRam.match(regex)[0]);
    data.freeRam = Number(val.freeRam.match(regex)[0]);
    if (!val) return;
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
              value: data.usedRam,
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
              value: data.freeRam,
              name: '剩余',
              itemStyle: {
                color: '#5ab1ef',
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
  },
);
</script>

<template>
  <EchartsUI ref="chartRef" />
</template>

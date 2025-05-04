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
    default: () => ({ cpuRate: '0%' }),
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
    data.usedRam = Number(val.cpuRate.match(regex)[0]);
    data.freeRam = 100 - data.usedRam;
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
                  return `${v.name}-${v.value}%`;
                },
              },
            },
            {
              value: data.freeRam,
              name: '未使用',
              itemStyle: {
                color: 'rgb(77, 119, 255)',
              },
              label: {
                show: true,
                formatter: (v) => {
                  return `${v.name}-${v.value}%`;
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

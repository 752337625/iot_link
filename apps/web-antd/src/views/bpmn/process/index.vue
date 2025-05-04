<script lang="ts" setup>
import { onMounted } from 'vue';

import BpmnGridBgModule from '@vben/bpmn-grid-bg';
import BpmnTranslateModule from '@vben/bpmn-i18n-zh';
import { Page } from '@vben/common-ui';

import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  // CamundaPlatformPropertiesProviderModule,
} from 'bpmn-js-properties-panel';
// import TokenSimulationModule from 'bpmn-js-token-simulation';
import BpmnModeler from 'bpmn-js/lib/Modeler';
// 3. 在实例化建模器时以自定义模块的方式传入参数
// import BpmnColorPickerModule from 'bpmn-js-color-picker';
import MinimapModule from 'diagram-js-minimap';

import CamundaBpmnModdle from './extension-moddle/camunda.json';

onMounted(() => {
  const bpmnModeler = new BpmnModeler({
    container: '#js-bpmn',
    // bpmnRenderer: {
    //   defaultFillColor: '#333',
    //   defaultStrokeColor: '#fff',
    // },
    // textRenderer: {
    //   defaultStyle: {
    //     fontFamily: '"Nothing You Could Do"',
    //     fontWeight: 'bold',
    //     fontSize: 12,
    //     lineHeight: 16,
    //   },
    //   externalStyle: {
    //     fontSize: 12,
    //     lineHeight: 16,
    //   },
    // },
    propertiesPanel: {
      parent: '#js-properties-panel',
    },
    gridLine: {
      smallGridSpacing: 20,
      gridSpacing: 80,
      gridLineStroke: 1,
      gridLineOpacity: 0.2,
      gridLineColor: '#20e512',
    },
    additionalModules: [
      BpmnGridBgModule,
      // TokenSimulationModule,
      BpmnPropertiesPanelModule,
      BpmnPropertiesProviderModule,
      // CamundaPlatformPropertiesProviderModule,
      BpmnTranslateModule,
      MinimapModule,
    ],
    // gridLine: {
    //   smallGridSpacing: 20,
    //   gridSpacing: 80,
    //   gridLineStroke: 1,
    //   gridLineOpacity: 0.2,
    //   gridLineColor: '#ddd',
    //   // gridLineColor: '#20e512'
    // },
    moddleExtensions: {
      camunda: CamundaBpmnModdle,
    },
  });
  // 创建图形，同时初始化其createDiagram方法内部的一个xml流程
  // bpmnModeler.get('canvas').zoom('fit-viewport');
  bpmnModeler.createDiagram();
  // 打开小地图
  bpmnModeler.get('minimap')?.open();
  // container.removeClass('with-diagram');
  // bpmnModeler.get('canvas')?.zoom('fit-viewport', 'auto');
  // console.log(bpmnModeler);
  // bpmnModeler.saveSVG();
  // bpmnModeler.get('keyboard').unbind();
});
</script>

<template>
  <Page auto-content-height content-class="p-0  relative flex">
    <div id="js-bpmn" class="h-full flex-1"></div>
    <div id="js-properties-panel" class="w-96 overflow-auto"></div>
  </Page>
</template>
<style lang="scss">
// palette 与 contentPad
@import 'bpmn-js/dist/assets/diagram-js.css'; // 基础样式
@import 'bpmn-js/dist/assets/bpmn-js.css'; // 节点基础图标
@import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
@import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'; // 节点图标
@import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
// propertiesPanel右侧元素属性编辑栏
@import '@bpmn-io/properties-panel/assets/properties-panel.css';
// 小地图
@import 'diagram-js-minimap/assets/diagram-js-minimap.css';

.djs-minimap {
  .toggle {
    @apply hidden;
  }
}
// 隐藏版权信息
.bjs-powered-by {
  display: none;
}
// 隐藏svg的边框
#js-bpmn {
  svg:focus {
    outline: none;
  }
}

// 隐藏属性面板的边框
#js-properties-panel {
  @apply h-full border-l border-gray-200;

  border-left: 1px solid #ccc;

  &:empty {
    display: none;
  }
}

// .djs-container {
//   background-image:
//     linear-gradient(90deg, rgb(200 200 200 / 40%) 10%, transparent 0),
//     linear-gradient(rgb(145 140 140 / 40%) 10%, transparent 0);
//   background-size: 10px 10px;

//   svg.new-parent {
//     background-color: none !important;
//   }
// }
</style>

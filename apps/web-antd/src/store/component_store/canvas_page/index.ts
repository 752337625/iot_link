import type { Iot_Canvas_Fabric } from './type';

import { defineStore } from 'pinia';
// 画布设置store
export const useLayoutCanvasStore = defineStore('useLayoutCanvasStore', {
  state: (): Iot_Canvas_Fabric => ({
    bg: {
      // backgroundImage: undefined,
      // backgroundColor: undefined,
      // backgroundEditable: false,
      // brightness: 0,
      // contrast: 0,
      // saturation: 0,
      // vibrance: 0,
      // blur: 0,
      // blendColor: undefined,
      // blendAlpha: 0,
      // blendMode: 'multiply',
      // rotation: 0,
      // invert: false,
      // noise: 0,
    },
    grid: {
      // gridBigEditable: undefined,
      // gridBigLineColor: undefined,
      // gridBigLineOpacity: undefined,
      // gridBigLineStroke: undefined,
      // gridBigSize: undefined,
      // gridSmallEditable: undefined,
      // gridSmallLineColor: undefined,
      // gridSmallLineOpacity: undefined,
      // gridSmallLineStroke: undefined,
      // gridSmallSize: undefined,
    },
  }),
  persist: true,
  actions: {
    /**
     * 初始化画布页面
     */
    initCanvasPage() {
      const fabric_grid = window._IOT_FABRIC_GRID_.getConfig();
      Object.keys(fabric_grid).forEach((key) => {
        this.grid[key] =
          this.grid[key] === undefined || this.grid[key] === null
            ? fabric_grid[key]
            : this.grid[key];
      });
      this.setValueTopFabricGrid(this.grid);
      const fabric_bg = window._IOT_FABRIC_BG_.getConfig();
      Object.keys(fabric_bg).forEach((key) => {
        this.bg[key] =
          this.bg[key] === undefined || this.bg[key] === null
            ? fabric_bg[key]
            : this.bg[key];
        this.setValueTopFabricBg(this.bg);
      });
    },
    setValueTopFabricBg(config: any) {
      window._IOT_FABRIC_BG_.setConfig(config);
      Object.keys(config).forEach((key: any) => {
        this.bg[key] = config[key];
      });
    },
    setValueTopFabricGrid(config: any) {
      window._IOT_FABRIC_GRID_.setConfig(config);
      Object.keys(config).forEach((key: any) => {
        this.grid[key] = config[key];
      });
    },
  },
});

import type { ChartLayoutStoreLeftType } from './chartLayoutLeftStore.d';

import { defineStore } from 'pinia';

import { chartLayoutLeftData } from './chartLayoutLeftStore.data';
// 编辑区域布局和静态设置
export const useChartLayoutLeftStore = defineStore('useChartLayoutLeftStore', {
  state: (): ChartLayoutStoreLeftType => ({
    show: true,
    activeIndex: {
      fatherMenu: 0,
      sonMenu: 0,
    },
    componentList: chartLayoutLeftData,
  }),
  getters: {
    getComponentList(state): Array<any> {
      return state.componentList;
    },
    getComponentSonList(state): Array<any> {
      return state.componentList[state.activeIndex.fatherMenu].children;
    },
    getComponentGrandList(state): Array<any> {
      const top = state.componentList[state.activeIndex.fatherMenu];
      if (!top.children || top.children.length === 0) return [];
      const middle = top.children[state.activeIndex.sonMenu];
      if (!middle.children || middle.children.length === 0) return [];
      return state.componentList[state.activeIndex.fatherMenu].children[
        state.activeIndex.sonMenu
      ].children;
    },
    getLayoutLeftItemShow(state): boolean {
      return state.show;
    },
  },
  actions: {
    /**
     * 是否显示才组件菜单
     * @param show
     */
    setLayoutLeftItemShow(show: boolean): void {
      this.show = show;
    },
    /**
     * 设置具体展示得组件列表
     * @param index
     * @param type
     */
    setComponentInfo(index: number, type: 'fatherMenu' | 'sonMenu'): void {
      const top = this.componentList[this.activeIndex.fatherMenu];
      switch (type) {
        case 'fatherMenu': {
          top.active = 0;
          if (top.children && top.children.length > 0) {
            const middle = top.children[this.activeIndex.sonMenu];
            middle.active = 0;
          }
          const father = this.componentList[index];
          father.active = 1;
          if (father.children && father.children.length > 0) {
            const son = father.children[0];
            son.active = 1;
          }
          this.activeIndex.sonMenu = 0;
          this.setComponentListIndex(index, type);
          break;
        }
        case 'sonMenu': {
          const middle = top.children[this.activeIndex.sonMenu];
          middle.active = 0;
          top.children[index].active = 1;
          this.setComponentListIndex(index, type);
          break;
        }
      }
    },

    /**
     * 记录父级菜单索引
     * @param index 菜单索引
     */
    setComponentListIndex(index: number, type: 'fatherMenu' | 'sonMenu'): void {
      this.activeIndex[type] = index;
    },
  },
});

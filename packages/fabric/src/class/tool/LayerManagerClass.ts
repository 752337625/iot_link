import { FabricObject } from 'fabric';
import { find } from 'lodash-es';

import { propertiesToInclude } from '../const';
import { FabricRanderClass } from '../FabricRanderClass';
import { createLayerItemHtml } from '../html/layer_html';

export class LayerManagerClass {
  id!: null | string;
  showLayer: boolean = false;
  private fabricRender!: FabricRanderClass;
  constructor(fabricRender: FabricRanderClass) {
    this.fabricRender = fabricRender;
    this.initializeToolFunctions();
    this.setWoH();
  }
  initializeToolFunctions() {
    this.setupLayerListeners(); // 监听图层变化
    this.setupLayerButtons(); // 点击图层按钮
    this.setupFunctionToCanvas(); // 点击画布
    this.setupCanvasToFunction(); // 点击画布
  }
  // 点击画布
  setupCanvasToFunction() {
    this.fabricRender.$$.on('mouse:up', (opt: any) => {
      if (opt.e.button !== 0) return;

      // 创建切换样式函数
      this.switchStyle();
    });
  }
  // 点击图层
  setupFunctionToCanvas() {
    const functionHtml = document.querySelector(
      '#fabric-layer-parent-item-function',
    ) as HTMLElement;
    functionHtml.addEventListener(
      'click',
      (e) => {
        const {
          delId,
          id,
          lockId,
          selectableId,
          showId,
          unlockId,
          unselectableId,
          visibleId,
        } = (e.target as HTMLElement).dataset;
        const objects = this.fabricRender.$$.getObjects();
        if (objects.length === 0) return;
        if (unselectableId) {
          const object = find(objects, { id: unselectableId }) as FabricObject;
          if (!object) return;
          object.set({
            evented: false,
            selectable: false,
          });
          this.fabricRender.$$.discardActiveObject();
        }
        if (selectableId) {
          const object = find(objects, { id: selectableId }) as FabricObject;
          if (!object) return;
          object.set({
            evented: true,
            selectable: true,
          });
          this.fabricRender.$$.setActiveObject(object);
        }
        if (visibleId) {
          const object = find(objects, { id: visibleId }) as FabricObject;
          if (!object) return;
          object.set({
            visible: true,
          });
          this.fabricRender.$$.setActiveObject(object);
        }
        if (showId) {
          const object = find(objects, { id: showId }) as FabricObject;
          if (!object) return;
          object.set({
            visible: false,
          });
          this.fabricRender.$$.discardActiveObject();
        }
        if (lockId) {
          const object = find(objects, { id: lockId }) as FabricObject;
          if (!object) return;
          object.set({
            lockMovementX: false,
            lockMovementY: false,
            lockRotation: false,
            lockScalingX: false,
            lockScalingY: false,
          });
          this.fabricRender.$$.discardActiveObject();
        }
        if (unlockId) {
          const object = find(objects, { id: unlockId }) as FabricObject;
          if (!object) return;
          object.set({
            lockMovementX: true,
            lockMovementY: true,
            lockRotation: true,
            lockScalingX: true,
            lockScalingY: true,
          });
          this.fabricRender.$$.setActiveObject(object);
        }
        if (delId) {
          const object = find(objects, { id: delId }) as FabricObject;
          if (!object) return;
          this.fabricRender.$$.remove(object);
          this.fabricRender.$$.discardActiveObject();
        }
        if (id) {
          const object = find(objects, { id }) as FabricObject;
          if (!object) return;
          this.fabricRender.$$.setActiveObject(object);
        }
        this.updateLayer();
        this.fabricRender.emit('fabric-add-history');
      },
      true,
    );
  }
  // 点击图层按钮
  setupLayerButtons() {
    const layer = document.querySelector(
      '#fabric-tool-parent-span-layer',
    ) as HTMLElement;
    layer.addEventListener('click', () => {
      const layerParentDiv = document.querySelector(
        '#fabric-layer-parent-div',
      ) as HTMLElement;
      this.showLayer = !this.showLayer;
      layerParentDiv.style.display = this.showLayer ? 'block' : 'none';
      this.switchStyle();
    });
  }
  // 监听图层变化
  setupLayerListeners() {
    this.fabricRender.on('fabric-add-component-success', () => {
      this.updateLayer();
      this.switchStyle();
    });
  }
  // 设置图层高度
  setWoH() {
    const doc = document.querySelector(
      `#${this.fabricRender.parentIdRef}`,
    ) as HTMLElement;
    const resizeObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[]) => {
        const { height = 0 } = (entries[0] && entries[0].contentRect) || {};
        const layer = document.querySelector(
          `#fabric-layer-parent-div`,
        ) as HTMLElement;
        layer.style.height = `${height - 80}px`;
      },
    );
    resizeObserver.observe(doc);
  }
  switchStyle() {
    if (this.id) {
      // eslint-disable-next-line unicorn/prefer-query-selector
      const span = document.getElementById(`${this.id}`);
      if (span) span.style.color = '#000';
      this.id = null;
    }
    const objects = this.fabricRender.$$.getActiveObjects();
    if (objects.length !== 1) return;
    const object = objects[0] as FabricObject;
    const id = object.get('id');
    if (id) {
      this.id = id;
      // eslint-disable-next-line unicorn/prefer-query-selector
      const span = document.getElementById(`${this.id}`);
      if (!span) return;
      span.style.color = 'hsl(212 100% 45%)';
    }
  }
  // 更新图层
  updateLayer() {
    // 获取当前画布的对象数据
    const data = this.fabricRender.$$.toObject(propertiesToInclude);
    // 过滤掉需要忽略的对象
    data.objects = data.objects.filter((object: FabricObject) => {
      return !object.ignoreElement;
    });

    // 创建图层
    const html = createLayerItemHtml(data);
    const functionHtml = document.querySelector(
      '#fabric-layer-parent-item-function',
    ) as HTMLElement;
    functionHtml.innerHTML = html;
  }
}

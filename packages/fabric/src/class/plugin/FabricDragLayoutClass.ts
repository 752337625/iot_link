import { FabricRanderClass } from '../FabricRanderClass';
/**
 * @title 鼠标右键拖拽画布
 * @description 鼠标右键拖拽画布
 * @constructor fabricRender: FabricRanderClass
 */
export class FabricDragLayoutClass {
  type = 'dragLayout';
  private fabricRender!: FabricRanderClass;
  private isDragging: boolean = false;
  private lastPosX: number = 0;
  private lastPosY: number = 0;
  constructor(fabricRender: FabricRanderClass) {
    this.fabricRender = fabricRender;
    this.onHandler(); // 初始化订阅主题
  }
  onHandler() {
    // 接下来3个事件监听的主要功能是移动画布，在按住 alt 后鼠标可以拖拽画布
    // 按下鼠标事件
    this.fabricRender.$$.on('mouse:down', (opt) => {
      const e = opt.e as MouseEvent;
      if (e.button === 2) {
        this.isDragging = true;
        this.fabricRender.$$.set({ evented: false, selection: false });
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
      }
    });
    // 移动鼠标事件
    this.fabricRender.$$.on('mouse:move', (opt) => {
      const e = opt.e as MouseEvent;
      if (this.isDragging && e.button === 0) {
        this.fabricRender.$$.discardActiveObject();
        const vpt = this.fabricRender.$$.viewportTransform;
        vpt[4] += e.clientX - this.lastPosX;
        vpt[5] += e.clientY - this.lastPosY;
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
        this.fabricRender.refreshCanvas({ grid: true });
      }
    });
    // 松开鼠标事件
    this.fabricRender.$$.on('mouse:up', (opt) => {
      const e = opt.e as MouseEvent;
      if (this.isDragging && e.button === 2) {
        this.fabricRender.$$.set({ evented: true, selection: true });
        const vpt = this.fabricRender.$$.viewportTransform;
        this.fabricRender.$$.setViewportTransform(vpt);
        this.isDragging = false;
      }
    });
  }
}

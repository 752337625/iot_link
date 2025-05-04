import type { TEvent } from 'fabric';

import { Point } from 'fabric';

import { FabricRanderClass } from '../FabricRanderClass';
import { zoomHtml } from '../html/zoom_html';
/**
 * @title 滚轮缩放画布
 * @description 滚轮缩放画布
 * @constructor fabricRenderer: FabricRanderClass
 */
export class FabricZoomClass {
  fabricRenderer!: FabricRanderClass;
  type = 'zoom';
  /**
   * 最大缩放比例
   */
  private maxZoomLevel: number = 5;
  /**
   * 最小缩放比例
   */
  private minZoomLevel: number = 0.1;

  constructor(fabricRenderer: FabricRanderClass) {
    this.fabricRenderer = fabricRenderer;
    this.initializeZoomControls();
    this.setupZoomEventHandlers();
    this.enableMouseWheelZoom();
  }

  /**
   * 缩放
   * @param zoomDelta 滚轮，向上滚一下是 -100，向下滚一下是 100
   * @param useMousePosition 是否以鼠标所在位置为原点缩放
   * @param offsetX 鼠标所在位置的 x 坐标
   * @param offsetY 鼠标所在位置的 y 坐标
   */
  applyZoom(
    zoomDelta: number,
    useMousePosition: boolean,
    offsetX?: number,
    offsetY?: number,
  ) {
    let currentZoom = this.fabricRenderer.$$.getZoom() * 0.999 ** zoomDelta;
    currentZoom = Math.min(
      this.maxZoomLevel,
      Math.max(this.minZoomLevel, currentZoom),
    );

    if (useMousePosition) {
      const point = new Point({ x: offsetX as number, y: offsetY as number });
      this.fabricRenderer.$$.zoomToPoint(point, currentZoom);
    } else {
      this.fabricRenderer.$$.setZoom(currentZoom);
    }

    (document.querySelector('#fabric-zoom-input') as HTMLInputElement).value =
      `${(currentZoom * 100).toFixed(0)}%`;
    this.fabricRenderer.refreshCanvas({ grid: true });
    this.fabricRenderer.emit('fabric-zoom-change', currentZoom);
  }
  /**
   * 启用鼠标滚轮缩放
   */
  enableMouseWheelZoom() {
    this.fabricRenderer.$$.on('mouse:wheel', ({ e }: TEvent<WheelEvent>) => {
      this.applyZoom(e.deltaY, true, e.offsetX, e.offsetY);
    });
  }
  /**
   * 初始化缩放控件
   */
  initializeZoomControls() {
    const parentElement = document.querySelector(
      `.${this.fabricRenderer.$$.containerClass}`,
    ) as HTMLElement;
    parentElement.insertAdjacentHTML('beforeend', zoomHtml);
  }
  /**
   * 设置缩放事件处理程序
   */
  setupZoomEventHandlers() {
    ['in', 'out'].forEach((direction) => {
      const delta = direction === 'in' ? -100 : 100;
      const button = document.querySelector(`#fabric-zoom-${direction}`);
      const svg = document.querySelector(`#fabric-zoom-${direction}-svg`);

      button?.addEventListener('mousedown', () => {
        svg?.setAttribute('fill', '#006BE6');
        const { left, top } = this.fabricRenderer.$$.getCenter();
        this.applyZoom(delta, true, left, top);
      });

      button?.addEventListener('mouseup', () =>
        svg?.setAttribute('fill', '#000'),
      );
    });
  }
}

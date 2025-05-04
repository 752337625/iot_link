import type { FabricObject } from 'fabric';

import {
  Circle,
  Control,
  controlsUtils,
  InteractiveFabricObject,
  Intersection,
} from 'fabric';

// import { fabric } from 'fabric';
import { FabricRanderClass } from '../FabricRanderClass';

export class FabricAttributeClass {
  private fabricRender!: FabricRanderClass;
  constructor(fabricRender: FabricRanderClass) {
    this.fabricRender = fabricRender;
    this.setWoH(); // 初始化订阅主题
    this.setControls();
    this.initControlsText();
    this.initHit();
  }
  createRenderIcon(w_multiple: number, h_multiple: number) {
    return (
      ctx: CanvasRenderingContext2D,
      _left: number,
      _top: number,
      _styleOverride: any,
      fabricObject: FabricObject,
    ) => {
      const { height, left, top, width } = fabricObject.getBoundingRect();
      const x = left + width * w_multiple;
      const y = top + height * h_multiple;
      ctx.font = 'small-caps bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'white';
      ctx.shadowColor = 'rgba(0,0,0,1)';
      ctx.shadowBlur = 2.5;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.fillText(`X：${x.toFixed(0)} Y：${y.toFixed(0)}`, _left, _top);
    };
  }
  /**
   * @description 初始化对角文字控制点
   */
  initControlsText() {
    InteractiveFabricObject.createControls = () => {
      return { controls: {} };
    };
    const controls = controlsUtils.createObjectDefaultControls();

    // 确保controls对象存在
    if (!InteractiveFabricObject.ownDefaults.controls) {
      InteractiveFabricObject.ownDefaults.controls = {};
    }

    InteractiveFabricObject.ownDefaults.controls = {
      ...controls,
    };
    this.setupControl('topLeftControl', -0.5, -0.5, 30, 0, 0);
    this.setupControl('topRightControl', 0.5, -0.5, 30, 1, 0);
    this.setupControl('bottomLeftControl', -0.5, 0.5, 45, 0, 1);
    this.setupControl('bottomRightControl', 0.5, 0.5, 45, 1, 1);
  }
  initHit() {
    const hit = new Circle({
      fill: 'rgba(179, 43, 72, 1)',
      originX: 'center',
      originY: 'center',
      radius: 4,
    });

    const onChange = ({ target }: { target: FabricObject }) => {
      target.setCoords();
      const ctx = this.fabricRender.$$.getTopContext();
      this.fabricRender.$$.clearContext(ctx);
      this.fabricRender.$$.forEachObject((obj) => {
        if (obj === target || obj.ignoreElement) return;
        const intersection = Intersection.intersectPolygonPolygon(
          target.getCoords(),
          obj.getCoords(),
        );

        if (
          intersection.status === 'Intersection' ||
          intersection.status === 'Coincident' ||
          obj.isContainedWithinObject(target) ||
          target.isContainedWithinObject(obj)
        ) {
          ctx.save();
          ctx.transform(...this.fabricRender.$$.viewportTransform);
          hit.transform(ctx);
          intersection.points.forEach(({ x, y }) => {
            ctx.save();
            ctx.translate(x, y);
            hit._render(ctx);
            ctx.restore();
          });
          ctx.restore();
        }
      });
    };
    const onUp = () => {
      const ctx = this.fabricRender.$$.getTopContext();
      this.fabricRender.$$.clearContext(ctx);
    };
    this.fabricRender.$$.on({
      'mouse:up': onUp,
      'object:moving': onChange,
      'object:rotating': onChange,
      'object:scaling': onChange,
      'object:skewing': onChange,
    });
  }

  setControls() {
    InteractiveFabricObject.ownDefaults = {
      ...InteractiveFabricObject.ownDefaults,
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'rgb(255,0,0,0.9)',
      borderDashArray: [4, 4],
      borderOpacityWhenMoving: 1,
      borderScaleFactor: 2,
      controls: InteractiveFabricObject.ownDefaults.controls || {},
      cornerColor: '#fff',
      cornerSize: 9,
      cornerStrokeColor: 'rgb(255,0,0,0.9)',
      cornerStyle: 'circle',
      hasBorders: true,
      hasControls: true,
      padding: 0,
      transparentCorners: false,
    };
  }
  /**
   * 设置控制点
   * @param position 控制点位置
   * @param x 控制点x坐标
   * @param y 控制点y坐标
   * @param offset 控制点偏移量
   * @param w_multiple 控制点宽度倍数
   * @param h_multiple 控制点高度倍数
   */
  setupControl(
    position: string,
    x: number,
    y: number,
    offset: number,
    w_multiple: number,
    h_multiple: number,
  ) {
    // 使用非空断言，确保controls对象存在
    if (InteractiveFabricObject.ownDefaults.controls) {
      InteractiveFabricObject.ownDefaults.controls[position] = new Control({
        offsetY: y * offset,
        render: this.createRenderIcon(w_multiple, h_multiple),
        x,
        y,
      });
    }
  }
  setWoH() {
    const doc = document.querySelector(
      `#${this.fabricRender.parentIdRef}`,
    ) as HTMLElement;
    const resizeObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[]) => {
        const { height = 0, width = 0 } =
          (entries[0] && entries[0].contentRect) || {};
        this.fabricRender.$$.setWidth(width);
        this.fabricRender.$$.setHeight(height);
        this.fabricRender.refreshCanvas({ background: true, grid: true });
      },
    );
    resizeObserver.observe(doc);
  }
}

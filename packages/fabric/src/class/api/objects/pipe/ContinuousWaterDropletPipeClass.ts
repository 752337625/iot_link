import type { XY } from 'fabric';

import { classRegistry, controlsUtils, Polyline } from 'fabric';
import { v4 } from 'uuid';

/**
 * 连续水滴管道
 */
export class ContinuousWaterDropletPipeClass extends Polyline {
  static override type = 'ContinuousWaterDropletPipe';
  override dataSet!: Record<string, any>;
  id!: string;
  innerstrokeDashOffset: number = 0; // 初始偏移量
  superType = 'Polyline';
  constructor(points: any, options: any) {
    super(points, options);
    this.dataSet = options.dataSet;
    this.id = v4();
    this.setOptions({
      fill: undefined,
      hasBorders: false,
      objectCaching: false,
      perPixelTargetFind: true,
      stroke: this.dataSet.outerDiameterStyle,
      strokeLineCap: 'round',
      strokeLineJoin: 'round',
      strokeUniform: true,
      strokeWidth: this.dataSet.outerDiameter,
      transparentCorners: false,
    });
    this.setControls();
  }
  static override fromObject(options: Record<string, unknown>) {
    return new Promise<ContinuousWaterDropletPipeClass>((resolve) => {
      resolve(new ContinuousWaterDropletPipeClass(options.points, options));
    });
  }
  override _render(ctx: CanvasRenderingContext2D) {
    super._render(ctx);
    const {
      dataSet: {
        innerDiameter,
        innerDiameterStyle,
        innerStrokeDashArray,
        speed,
      },
      pathOffset,
      points,
    } = this;

    // 使用外部控制的速度变量来更新偏移量
    this.innerstrokeDashOffset = (this.innerstrokeDashOffset + speed) % 100;

    // 绘制外部管道
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = innerDiameter;
    ctx.strokeStyle = innerDiameterStyle;
    ctx.setLineDash(innerStrokeDashArray);
    ctx.lineDashOffset = this.innerstrokeDashOffset; // 使用当前偏移量
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // 优化点的绘制逻辑
    if (points.length > 0) {
      const firstPoint = points[0] as XY;
      ctx.moveTo(firstPoint.x - pathOffset.x, firstPoint.y - pathOffset.y);

      for (let i = 1; i < points.length; i++) {
        const point = points[i] as XY;
        ctx.lineTo(point.x - pathOffset.x, point.y - pathOffset.y);
      }
    }

    ctx.stroke();
    ctx.restore();
  }
  setControls() {
    this.controls = controlsUtils.createPolyControls(this);
  }
}

classRegistry.setClass(
  ContinuousWaterDropletPipeClass,
  'ContinuousWaterDropletPipe',
);

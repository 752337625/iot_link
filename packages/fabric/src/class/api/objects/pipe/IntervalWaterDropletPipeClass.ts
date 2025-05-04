import type { XY } from 'fabric';

import { classRegistry, controlsUtils, Polyline } from 'fabric';
import { v4 } from 'uuid';
/**
 * 间隔水滴管道
 */
export class IntervalWaterDropletPipeClass extends Polyline {
  static override type = 'IntervalWaterDropletPipe';
  animated: boolean = true;
  override dataSet!: Record<string, any>;
  id!: string;
  innerstrokeDashOffset: number = 0; // 初始偏移量
  isRunning: boolean = true;
  lastStateChangeTime: number = 0;
  superType = 'Polyline';
  constructor(points: any, options: any) {
    super(points, options);
    this.dataSet = options.dataSet;
    this.id = v4();
    this.setOptions({
      ...options,
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
    return new Promise<IntervalWaterDropletPipeClass>((resolve) => {
      resolve(new IntervalWaterDropletPipeClass(options.points, options));
    });
  }
  override _render(ctx: CanvasRenderingContext2D) {
    super._render(ctx);
    const {
      dataSet: {
        innerDiameter,
        innerDiameterStyle,
        innerStrokeDashArray,
        pauseMilliseconds,
        runMilliseconds,
        speed,
      },
      pathOffset,
      points,
    } = this;

    // 检查动画状态
    const currentTime = Date.now();

    // 初始化时间状态
    if (!this.lastStateChangeTime) {
      this.lastStateChangeTime = currentTime;
      this.isRunning = true;
    }

    // 检查是否需要切换状态
    if (this.isRunning) {
      // 当前是运行状态
      if (currentTime - this.lastStateChangeTime >= runMilliseconds) {
        // 运行时间已到，切换到暂停状态
        this.isRunning = false;
        this.lastStateChangeTime = currentTime;
      } else {
        // 仍在运行时间内，更新偏移量
        this.innerstrokeDashOffset = (this.innerstrokeDashOffset + speed) % 100;
      }
    } else {
      // 当前是暂停状态
      if (currentTime - this.lastStateChangeTime >= pauseMilliseconds) {
        // 暂停时间已到，切换到运行状态
        this.isRunning = true;
        this.lastStateChangeTime = currentTime;
      }
      // 暂停状态下不更新偏移量，保持静止
    }

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
  IntervalWaterDropletPipeClass,
  'IntervalWaterDropletPipe',
);

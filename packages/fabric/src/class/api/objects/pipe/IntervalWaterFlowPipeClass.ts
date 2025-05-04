import { classRegistry, controlsUtils, Point, Polyline } from 'fabric';
import { v4 } from 'uuid';

// 间隔的水流管道
export class IntervalWaterFlowPipeClass extends Polyline {
  static override type = 'IntervalWaterFlowPipe';
  override dataSet!: Record<string, any>;
  id!: string;
  innerstrokeDashOffset: number = 0; // 初始偏移量
  lineIndexCache: number = 1; // 缓存绘制第n段线段的n值, 为了在进行下一段绘制前把这一段线段的末尾补齐;
  startTime: number = 0; // 内管开始时间
  superType = 'Polyline';
  constructor(points: any, options: any) {
    super(points, options);
    this.dataSet = options.dataSet;
    this.id = v4();
    this.setOptions({
      fill: undefined,
      hasBorders: false,
      objectCaching: false,
      perPixelTargetFind: true, // 启用像素级目标查找
      stroke: this.dataSet.outerDiameterStyle, // 外部水管颜色
      strokeLineCap: 'round',
      strokeLineJoin: 'round',
      strokeUniform: true, // 限制边框宽度缩放
      strokeWidth: this.dataSet.outerDiameter, // 外部水管直径
      transparentCorners: false,
    });
    this.setControls();
  }
  static override fromObject(options: Record<string, unknown>) {
    return new Promise<IntervalWaterFlowPipeClass>((resolve) => {
      resolve(new IntervalWaterFlowPipeClass(options.points, options));
    });
  }
  override _render(ctx: CanvasRenderingContext2D) {
    super._render(ctx);
    const {
      dataSet: { duration, innerDiameter, innerDiameterStyle },
      pathOffset,
      points,
    } = this;
    ctx.save();
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = innerDiameter;
    ctx.strokeStyle = innerDiameterStyle;
    const keyPoints: any[] = points.map(
      (point) => new Point(point.x - pathOffset.x, point.y - pathOffset.y),
    );
    ctx.moveTo(keyPoints[0].x, keyPoints[0].y);

    // 计算管道总长度
    let totalLength = 0;
    const segmentLengths: any[] = [];

    for (let i = 1; i < keyPoints.length; i++) {
      const dx = keyPoints[i].x - keyPoints[i - 1].x;
      const dy = keyPoints[i].y - keyPoints[i - 1].y;
      const length = Math.hypot(dx, dy);
      segmentLengths.push(length);
      totalLength += length;
    }

    // 计算每个线段的长度比例
    const segmentProportions: any = segmentLengths.map(
      (length) => length / totalLength,
    );

    // 期望动画持续的时间
    const currentTime = performance.now();
    // 第一帧绘制时记录下开始的时间
    if (!this.startTime) this.startTime = currentTime;
    // 已经过去的时间(ms)
    const timeElapsed = currentTime - this.startTime;
    // 动画执行的进度 {0,1}
    const progress = (timeElapsed % duration) / duration;

    // 找到当前进度对应的线段
    let accumulatedProportion = 0;
    let lineIndex = 0;

    for (const [i, segmentProportion] of segmentProportions.entries()) {
      accumulatedProportion += segmentProportion;
      if (progress <= accumulatedProportion) {
        lineIndex = i + 1;
        break;
      }
    }

    if (progress >= 1) {
      lineIndex = keyPoints.length - 1;
    }

    // 计算当前线段内的进度
    const previousAccumulatedProportion =
      accumulatedProportion - segmentProportions[lineIndex - 1];
    const partProgress =
      segmentProportions[lineIndex - 1] === 0
        ? 0
        : (progress - previousAccumulatedProportion) /
          segmentProportions[lineIndex - 1];

    // 当绘制下一段线段前,把上一段末尾缺失的部分补齐
    if (lineIndex !== this.lineIndexCache) this.lineIndexCache = lineIndex;

    const nextX = Math.trunc(
      keyPoints[lineIndex - 1].x +
        (keyPoints[lineIndex].x - keyPoints[lineIndex - 1].x) * partProgress,
    );
    const nextY = Math.trunc(
      keyPoints[lineIndex - 1].y +
        (keyPoints[lineIndex].y - keyPoints[lineIndex - 1].y) * partProgress,
    );

    for (let i = 1; i <= this.lineIndexCache; i++) {
      if (i === this.lineIndexCache) {
        ctx.lineTo(nextX, nextY);
      } else {
        ctx.lineTo(keyPoints[i].x, keyPoints[i].y);
      }
    }

    ctx.stroke();
    ctx.restore();
  }
  setControls() {
    this.controls = controlsUtils.createPolyControls(this);
  }
}
classRegistry.setClass(IntervalWaterFlowPipeClass, 'IntervalWaterFlowPipe');

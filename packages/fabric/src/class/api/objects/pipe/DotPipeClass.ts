import { classRegistry, controlsUtils, Point, Polyline } from 'fabric';
import { v4 } from 'uuid';

export class DotPipeClass extends Polyline {
  static override type = 'DotPipe';
  override dataSet!: Record<string, any>;
  id!: string;
  startTime: number = 0;
  superType = 'Polyline';
  constructor(points: any, options: any) {
    super(points, options);
    this.dataSet = options.dataSet;
    this.id = v4();
    this.set({
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
    return new Promise<DotPipeClass>((resolve) => {
      resolve(new DotPipeClass(options.points, options));
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
    ctx.fillStyle = innerDiameterStyle;
    const keyPoints: any[] = points.map(
      (point) => new Point(point.x - pathOffset.x, point.y - pathOffset.y),
    );
    // 期望动画持续的时间
    const currentTime = performance.now();
    // 第一帧绘制时记录下开始的时间
    if (!this.startTime) this.startTime = currentTime;
    // 已经过去的时间(ms)
    const timeElapsed = currentTime - this.startTime;
    // 动画执行的进度 {0,1}
    const progress = Math.min(timeElapsed / duration, 1);
    // 计算管道总长度
    let totalLength = 0;
    const segmentLengths: any[] = [];
    for (let i = 0; i < keyPoints.length - 1; i++) {
      const dx = keyPoints[i + 1].x - keyPoints[i].x;
      const dy = keyPoints[i + 1].y - keyPoints[i].y;
      // 在代码中，Math.hypot(dx, dy) 用于计算两点之间的欧几里得距离（即直线距离）。在上下文中，它用于计算管道中每个线段的长度。
      const length = Math.hypot(dx, dy);
      segmentLengths.push(length);
      totalLength += length;
    }
    // 根据进度计算当前位置应该走过的距离
    const targetDistance = totalLength * progress;
    // 找到当前所在的线段
    let distanceCovered = 0;
    let lineIndex = 0;
    for (const [i, segmentLength] of segmentLengths.entries()) {
      if (distanceCovered + segmentLength >= targetDistance) {
        lineIndex = i;
        break;
      }
      distanceCovered += segmentLength;
    }

    // 计算在当前线段上的进度
    const segmentProgress =
      lineIndex < segmentLengths.length
        ? (targetDistance - distanceCovered) / segmentLengths[lineIndex]
        : 1;

    // 计算当前点的位置
    const nextX = Math.trunc(
      keyPoints[lineIndex].x +
        (keyPoints[lineIndex + 1].x - keyPoints[lineIndex].x) * segmentProgress,
    );
    const nextY = Math.trunc(
      keyPoints[lineIndex].y +
        (keyPoints[lineIndex + 1].y - keyPoints[lineIndex].y) * segmentProgress,
    );

    // 圆心位置 (x, y), 半径, 起始角度, 结束角度, 方向 (true为顺时针, false为逆时针)
    ctx.arc(nextX, nextY, innerDiameter / 2, 0, Math.PI * 2, true);
    if (progress >= 1) {
      this.startTime = 0;
    }
    ctx.fill();
    ctx.restore();
  }
  setControls() {
    this.controls = controlsUtils.createPolyControls(this);
  }
}
classRegistry.setClass(DotPipeClass, 'DotPipe');

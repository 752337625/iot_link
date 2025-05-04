import type { XY } from 'fabric';

import { classRegistry, controlsUtils, Polyline } from 'fabric';
import { v4 } from 'uuid';

/**
 * 连续箭头管道
 */
export class ContinuousArrowDropletPipeClass extends Polyline {
  static override type = 'ContinuousArrowDropletPipe';
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
      stroke: this.dataSet.outerDiameterStyle, // 外径颜色
      strokeLineCap: 'round', // 线帽样式
      strokeLineJoin: 'round', // 线连接样式
      strokeUniform: true, // 线均匀
      strokeWidth: this.dataSet.outerDiameter, // 外径宽度
      transparentCorners: false, // 透明角
    });
    this.setControls();
  }
  static override fromObject(options: Record<string, unknown>) {
    return new Promise<ContinuousArrowDropletPipeClass>((resolve) => {
      resolve(new ContinuousArrowDropletPipeClass(options.points, options));
    });
  }
  override _render(ctx: CanvasRenderingContext2D) {
    super._render(ctx);
    const {
      dataSet: { speed },
    } = this;
    // 使用外部控制的速度变量来更新偏移量
    this.innerstrokeDashOffset = (this.innerstrokeDashOffset + speed) % 100;
    // 绘制外部管道
    ctx.save();
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    this.drawArrows(ctx);
    ctx.restore();
  }
  // 添加绘制箭头的方法
  drawArrows(ctx: CanvasRenderingContext2D) {
    const {
      dataSet: { arrowColor, arrowSize, arrowSpacing, tailLength },
      pathOffset,
      points,
    } = this;
    // 计算箭头总长度（头部+尾部）
    const totalArrowLength = arrowSize + tailLength;

    // 计算路径总长度
    let pathLength = 0;
    const segmentLengths: any[] = [];
    for (let i = 1; i < points.length; i++) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const dx = points[i].x - points[i - 1].x;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const dy = points[i].y - points[i - 1].y;
      const segmentLength = Math.hypot(dx, dy);
      segmentLengths.push(segmentLength);
      pathLength += segmentLength;
    }

    // 计算箭头数量
    const arrowCount = Math.max(1, Math.floor(pathLength / arrowSpacing));
    const actualSpacing = pathLength / arrowCount;

    // 计算初始偏移量，确保在动画过程中箭头不会超出线段
    let distanceTraveled = (this.innerstrokeDashOffset / 100) * actualSpacing;
    distanceTraveled = distanceTraveled % actualSpacing; // 确保不会超过间距

    ctx.save();

    let currentSegment = 0;
    let segmentProgress = 0;
    let remainingDistance = distanceTraveled;

    for (let i = 0; i < arrowCount; i++) {
      // 重置当前段和进度，确保每个箭头都从正确的位置开始
      currentSegment = 0;
      segmentProgress = 0;
      remainingDistance = distanceTraveled + i * actualSpacing;

      // 找到箭头应该在的线段
      while (
        currentSegment < segmentLengths.length &&
        remainingDistance > segmentLengths[currentSegment] - segmentProgress
      ) {
        remainingDistance -= segmentLengths[currentSegment] - segmentProgress;
        currentSegment++;
        segmentProgress = 0;

        // 如果超出了最后一个线段，则不绘制这个箭头
        if (currentSegment >= segmentLengths.length) {
          break;
        }
      }

      // 如果超出了线段范围，跳过这个箭头
      if (currentSegment >= segmentLengths.length) {
        continue;
      }

      segmentProgress += remainingDistance;

      // 获取当前线段长度
      const segmentLength = segmentLengths[currentSegment];

      // 检查箭头是否会超出线段
      // 箭头头部需要在线段内，尾部也需要在线段内
      if (
        segmentProgress < totalArrowLength ||
        segmentProgress > segmentLength - arrowSize
      ) {
        continue; // 跳过这个箭头，因为它会超出线段
      }

      // 计算箭头位置
      const startPoint = points[currentSegment] as XY;
      const endPoint = points[currentSegment + 1] as XY;

      const dx = endPoint.x - startPoint.x;
      const dy = endPoint.y - startPoint.y;

      const ratio = segmentProgress / segmentLength;
      const arrowX = startPoint.x + dx * ratio - pathOffset.x;
      const arrowY = startPoint.y + dy * ratio - pathOffset.y;

      // 计算箭头角度
      const angle = Math.atan2(dy, dx);

      // 绘制箭头
      ctx.translate(arrowX, arrowY);
      ctx.rotate(angle);

      // 绘制箭头主体
      ctx.fillStyle = arrowColor;
      ctx.strokeStyle = arrowColor;
      ctx.lineWidth = arrowSize / 4;

      // 绘制箭头头部
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-arrowSize, arrowSize / 2);
      ctx.lineTo(-arrowSize * 0.7, 0);
      ctx.lineTo(-arrowSize, -arrowSize / 2);
      ctx.closePath();
      ctx.fill();

      // 绘制尾部
      ctx.beginPath();
      ctx.moveTo(-arrowSize * 0.7, 0);
      ctx.lineTo(-arrowSize - tailLength, 0);
      ctx.stroke();

      // 重置变换
      ctx.rotate(-angle);
      ctx.translate(-arrowX, -arrowY);
    }

    // 清除阴影效果
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

    ctx.restore();
  }
  setControls() {
    this.controls = controlsUtils.createPolyControls(this);
  }
}
classRegistry.setClass(
  ContinuousArrowDropletPipeClass,
  'ContinuousArrowDropletPipe',
);

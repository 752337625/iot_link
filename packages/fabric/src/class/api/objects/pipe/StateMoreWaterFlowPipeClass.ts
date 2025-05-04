import { classRegistry, controlsUtils, Point, Polyline } from 'fabric';
import { v4 } from 'uuid';

// 有状态水流管道
export class StateMoreWaterFlowPipeClass extends Polyline {
  static override type = 'StateMoreWaterFlowPipe';
  override dataSet!: Record<string, any>;
  id!: string;
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
      stroke: this.dataSet.outerDiameterStyle, // 外部水滴颜色
      strokeLineCap: 'round',
      strokeLineJoin: 'round',
      strokeUniform: true, // 限制边框宽度缩放
      strokeWidth: this.dataSet.outerDiameter, // 外部水滴直径
      transparentCorners: false,
    });
    this.setControls();
  }
  static override fromObject(options: Record<string, unknown>) {
    return new Promise<StateMoreWaterFlowPipeClass>((resolve) => {
      resolve(new StateMoreWaterFlowPipeClass(options.points, options));
    });
  }
  override _render(ctx: CanvasRenderingContext2D) {
    super._render(ctx);
    const {
      dataSet: { innerDiameter, innerDiameterStyle },
      pathOffset,
      points,
    } = this;
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = innerDiameter; // 设置边框的宽度
    ctx.strokeStyle = innerDiameterStyle; // 设置边框的颜色
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    points.forEach((point, index) => {
      const originalPoint = new Point(
        point.x - pathOffset.x,
        point.y - pathOffset.y,
      );

      if (index === 0) {
        ctx.moveTo(originalPoint.x, originalPoint.y);
      } else {
        ctx.lineTo(originalPoint.x, originalPoint.y);
      }
    });
    ctx.stroke();
    ctx.restore();
  }
  setControls() {
    this.controls = controlsUtils.createPolyControls(this);
  }
}
classRegistry.setClass(StateMoreWaterFlowPipeClass, 'StateMoreWaterFlowPipe');

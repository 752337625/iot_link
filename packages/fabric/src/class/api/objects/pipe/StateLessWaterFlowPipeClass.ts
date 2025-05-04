/* eslint-disable @typescript-eslint/ban-ts-comment */
import { classRegistry, controlsUtils, Polyline } from 'fabric';
import { v4 } from 'uuid';

// 无状态水流管道
// @ts-ignore
export class StateLessWaterFlowPipeClass extends Polyline {
  static override type = 'StateLessWaterFlowPipe';
  override dataSet!: Record<string, any>;
  id!: string;
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
    return new Promise<StateLessWaterFlowPipeClass>((resolve) => {
      resolve(new StateLessWaterFlowPipeClass(options.points, options));
    });
  }
  setControls() {
    this.controls = controlsUtils.createPolyControls(this);
  }
  setStroke(dataSet: { outerDiameter: number; outerDiameterStyle: string }) {
    this.set({
      stroke: dataSet.outerDiameterStyle,
      strokeWidth: dataSet.outerDiameter,
    });
  }
}
classRegistry.setClass(StateLessWaterFlowPipeClass, 'StateLessWaterFlowPipe');

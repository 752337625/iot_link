import { classRegistry, controlsUtils, Path } from 'fabric';
import { v4 } from 'uuid';

export class StateMoreWaterFlowPathClass extends Path {
  static override type = 'StateMoreWaterFlowPath';
  override dataSet!: Record<string, any>;
  id!: string;
  superType = 'Path';
  constructor(path: any, options: any) {
    super(path);
    this.dataSet = options.dataSet;
    this.id = v4();
    this.setOptions({
      ...options,
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
    return new Promise<StateMoreWaterFlowPathClass>((resolve) => {
      resolve(new StateMoreWaterFlowPathClass(options.path, options));
    });
  }
  override _render(ctx: CanvasRenderingContext2D) {
    // 首先渲染外部路径
    super._render(ctx);

    // 保存当前上下文状态
    ctx.save();

    // 如果有内径设置，则绘制内部管道
    if (this.dataSet.innerDiameter && this.dataSet.innerDiameterStyle) {
      // 设置内部管道的样式
      ctx.strokeStyle = this.dataSet.innerDiameterStyle; // 内径颜色
      ctx.lineWidth = this.dataSet.innerDiameter; // 内径宽度
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.setLineDash([10, 10]);

      // 重要：应用与外部路径相同的变换
      // 这确保内部路径与外部路径完全对齐
      ctx.translate(-this.pathOffset.x, -this.pathOffset.y);

      // 重新绘制相同的路径，但使用内径的样式
      if (this.path) {
        ctx.beginPath();

        // 遍历路径命令并重新绘制
        for (let i = 0; i < this.path.length; i++) {
          const item = this.path[i];
          if (!item) continue; // 跳过未定义的项

          const command = item[0]; // 命令类型 (M, L, C 等)

          switch (command) {
            case 'C': {
              // 贝塞尔曲线
              if (item.length >= 7) {
                // 确保有足够的点
                ctx.bezierCurveTo(
                  item[1],
                  item[2],
                  item[3],
                  item[4],
                  item[5],
                  item[6],
                );
              }
              break;
            }
            case 'L': {
              // 画线到
              if (item.length >= 3) {
                // 确保有足够的点
                ctx.lineTo(item[1], item[2]);
              }
              break;
            }
            case 'M': {
              // 移动到
              if (item.length >= 3) {
                // 确保有足够的点
                ctx.moveTo(item[1], item[2]);
              }
              break;
            }
            case 'Q': {
              // 二次贝塞尔曲线
              if (item.length >= 5) {
                // 确保有足够的点
                ctx.quadraticCurveTo(item[1], item[2], item[3], item[4]);
              }
              break;
            }
            // 可以根据需要添加更多命令类型的处理
          }
        }

        // 只绘制描边，不填充
        ctx.stroke();
      }
    }

    // 恢复上下文状态
    ctx.restore();
  }
  setControls() {
    this.controls = controlsUtils.createPathControls(this);
    this.cornerColor = 'rgba(0,0,255,0.5)';
  }
}

classRegistry.setClass(StateMoreWaterFlowPathClass, 'StateMoreWaterFlowPath');

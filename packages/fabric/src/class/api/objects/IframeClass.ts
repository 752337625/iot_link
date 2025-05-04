import { classRegistry, Rect } from 'fabric';
import { v4 } from 'uuid';

export class IframeClass extends Rect {
  static override type = 'iframe';
  override dataSet!: Record<string, any>;
  element!: HTMLDivElement;
  id!: string;
  iframeElement!: HTMLIFrameElement;
  superType = 'Element';
  constructor(options: any) {
    super(options);
    this.dataSet = options.dataSet;
    this.id = v4();
    this.setOptions({
      fill: 'rgba(255, 255, 255, 0)',
      height: options.height ?? 300,
      objectCaching: false,
      snapAngle: 20,
      snapThreshold: 3,
      stroke: 'rgba(255, 255, 255, 0)',
      width: options.width ?? 800,
    });
  }
  static override fromObject(options: Record<string, unknown>) {
    return new Promise<IframeClass>((resolve) => {
      resolve(new IframeClass(options));
    });
  }
  override _render(ctx: CanvasRenderingContext2D) {
    super._render(ctx);
    if (!this.element) {
      const { angle, dataSet, height, id, scaleX, scaleY, width } = this;
      const zoom = this.canvas.getZoom();
      const left = this.oCoords.tl.x;
      const top = this.oCoords.tl.y;

      // 创建iframe元素
      this.iframeElement = document.createElement('iframe');
      this.iframeElement.height = '100%';
      this.iframeElement.width = '100%';
      this.iframeElement.src = dataSet.href;

      // 创建包装div
      this.element = document.createElement('div');
      this.element.id = `${id}`;
      this.element.style.cssText = `
        transform: rotate(${angle}deg);
        width: ${width * scaleX * zoom}px;
        height: ${height * scaleY * zoom}px;
        left: ${left}px;
        top: ${top}px;
        position: absolute;
        user-select: none;
        pointer-events: none;
        background-color: rgba(255, 255, 255, 1);
      `;

      // 将iframe添加到div中
      this.element.append(this.iframeElement);

      // 将div添加到容器中
      const container = document.querySelector(
        `.${this.canvas.containerClass}`,
      );
      container?.append(this.element);
    }
  }
  setSource(source: any) {
    this.setSrc(source);
  }
  setSrc(src: string) {
    this.set({
      src,
    });
    this.iframeElement.src = src;
  }
}
classRegistry.setClass(IframeClass, 'iframe');

import { classRegistry, FabricImage } from 'fabric';
import { v4 } from 'uuid';
/**
 * 图片类
 * @描述 可渲染Svg动图
 * @注意 图片类在渲染时，可能无法对所有的Svg静态（包括动态）进行渲染，如果需要渲染Svg静态，请使用SvgClass类只能渲染Svg静态
 * @问题 会遗留一个dom元素在页面，后期需要删除处理
 */
export class SvgGifClass extends FabricImage {
  static override type = 'svggif';
  override dataSet!: Record<string, any>;
  id!: string;
  superType: string = 'Image';
  constructor(options: any) {
    const img = new Image();
    img.src = options.dataSet.src;
    super(img, options);
    this.dataSet = options.dataSet;
    this.id = v4();
    this.setOptions({
      objectCaching: false,
      snapAngle: 20,
      snapThreshold: 3,
    });
    this.ensureDomElementExists(img);
  }

  static override fromObject(options: Record<string, unknown>) {
    return new Promise<SvgGifClass>((resolve) => {
      resolve(new SvgGifClass(options));
    });
  }

  /**
   * @描述 确保DOM元素存在，而且只能是一个
   */
  private ensureDomElementExists(img: HTMLImageElement): void {
    const id = `svggif-${this.dataSet.src}`;
    // eslint-disable-next-line unicorn/prefer-query-selector
    const dom = document.getElementById(id);
    if (dom) return;
    img.id = id;
    img.style.position = 'fixed';
    img.style.top = '0px';
    img.style.zIndex = '-100';
    img.width = 1;
    img.height = 1;
    document.body.append(img);
  }
}
classRegistry.setClass(SvgGifClass, 'svggif');

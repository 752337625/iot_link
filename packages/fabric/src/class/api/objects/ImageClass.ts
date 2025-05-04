import { classRegistry, FabricImage } from 'fabric';
import { v4 } from 'uuid';
/**
 * 图片类
 * @描述 可渲染Svg静态、Svg动图、其他格式图片
 * @注意 图片类在渲染时，可能无法对所有的Svg静态（包括动态）进行渲染，如果需要渲染Svg静态，请使用SvgClass类只能渲染Svg静态
 */
export class ImageClass extends FabricImage {
  static override type = 'img';
  // brightness: filters.Brightness = new filters.Brightness({ brightness: 0 }); // 亮度
  override dataSet!: Record<string, any>;
  id!: string;
  superType: string = 'Image';
  constructor(options: any) {
    const img = new Image();
    img.src = options.dataSet.src;
    // const subFilters =
    //   options.filters && options.filters.length > 0
    //     ? structuredClone(options.filters)
    //     : undefined;
    options.filters = [];
    super(img, options);
    this.dataSet = options.dataSet;
    this.id = v4();
    this.setOptions({
      objectCaching: true,
      snapAngle: 20,
      snapThreshold: 3,
    });
    // if (subFilters) {
    //   subFilters.forEach((item: any) => {
    //     this.setDoFilter(item.type, item[item.type.toLocaleLowerCase()]);
    //   });
    // }
  }
  static override fromObject(options: Record<string, unknown>) {
    return new Promise<ImageClass>((resolve) => {
      resolve(new ImageClass(options));
    });
  }
  /**
   * @description 设置背景滤镜 适用于背景图片非Svg、Gif
   * @param filters
   */
  // setDoFilter(
  //   type: 'Blur' | 'Brightness' | 'Contrast' | 'Saturation' | 'Vibrance',
  //   value: number,
  // ) {
  //   if (type === 'Brightness') {
  //     this.brightness.brightness = value;
  //   }
  // if (type === 'Contrast') {
  //   (this.doFilter.subFilters[1] as filters.Contrast).contrast = value;
  // }
  // if (type === 'Blur') {
  //   (this.doFilter.subFilters[2] as filters.Blur).blur = value;
  // }
  // if (type === 'Saturation') {
  //   (this.doFilter.subFilters[3] as filters.Saturation).saturation = value;
  // }
  // if (type === 'Vibrance') {
  //   (this.doFilter.subFilters[4] as filters.Vibrance).vibrance = value;
  // }
  //   this.applyFilters();
  // }
}
classRegistry.setClass(ImageClass, 'img');

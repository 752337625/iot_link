import {
  classRegistry,
  FabricObject,
  Group,
  LayoutManager,
  loadSVGFromURL,
  util,
} from 'fabric';
import { v4 } from 'uuid';
/**
 * 图片类
 * @描述 可渲染Svg静态
 */
export class SvgClass extends Group {
  static override type = 'svg';
  override dataSet!: Record<string, any>;
  id!: string;
  superType = 'Group';
  constructor(objects: FabricObject[], options: any) {
    super(objects);
    this.dataSet = options.dataSet;
    this.id = v4();
    this.setOptions({
      ...options,
      layoutManager: new LayoutManager(),
      objectCaching: false,
      snapAngle: 20,
      snapThreshold: 3,
    });
    this.setCoords();
  }
  static override async fromObject(options: Record<string, unknown>) {
    const svgElement = await loadSvg(options);
    return new Promise<SvgClass>((resolve) => {
      resolve(new SvgClass([svgElement], options));
    });
  }
}

// 为了能正确反序列化，需要确保SvgClass在classRegistry中注册，并指定正确的类型字符串
classRegistry.setClass(SvgClass, 'svg');

export async function loadSvg(options: any) {
  const res = await loadSVGFromURL(options.dataSet.src);
  const objects = res.objects as FabricObject[];
  const svgElement = util.groupSVGElements(objects) as Group;
  return svgElement;
}

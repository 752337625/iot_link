/* eslint-disable @typescript-eslint/ban-ts-comment */
import { classRegistry, FabricImage, util } from 'fabric';
import { v4 } from 'uuid';

import 'gifler';
/**
 * 图片类
 * @描述 可渲染Gif动图
 * @注意 图片类在渲染时，可能无法对所有的Gif进行渲染。因为无法进行解码。可去https://ezgif.com/apng-to-gif?err=expired 进行转换
 */
export class GifClass extends FabricImage {
  static override type = 'gif';
  override dataSet!: Record<string, any>;
  id!: string;
  superType = 'Image';
  constructor(options: any) {
    const canvas = util.createCanvasElement();
    super(canvas, options);
    this.dataSet = options.dataSet;
    this.id = v4();
    this.setOptions({
      objectCaching: false,
      snapAngle: 20,
      snapThreshold: 3,
    });

    this.drawFrame(canvas);
  }
  static override fromObject(options: Record<string, unknown>) {
    return new Promise<GifClass>((resolve) => {
      resolve(new GifClass(options));
    });
  }
  async drawFrame(canvas: HTMLCanvasElement) {
    const dataSet = this.get('dataSet');
    // @ts-ignore
    gifler(dataSet.src).animate(canvas);
    const img = new Image();
    img.src = dataSet.src;
    img.addEventListener('load', () => {
      this.set({
        height: img.height,
        width: img.width,
      });
      this.setCoords();
    });
  }
}
classRegistry.setClass(GifClass, 'gif');

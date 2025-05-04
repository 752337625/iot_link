// declare global {
//   interface Window {
//     svg_gif_dom: any[];
//   }
// }
import { filters } from 'fabric';

import { FabricBackgroundClass } from './class/plugin/FabricBackgroundClass';
import { FabricDragLayoutClass } from './class/plugin/FabricDragLayoutClass';
import { FabricGridClass } from './class/plugin/FabricGridClass';
import { FabricZoomClass } from './class/plugin/FabricZoomClass';

declare module 'fabric' {
  interface FabricObject {
    dataSet: Record<string, any>;
    id?: string;
    ignoreElement?: boolean;
  }
}
export type FabricPlugin =
  | FabricBackgroundClass
  | FabricDragLayoutClass
  | FabricGridClass
  | FabricZoomClass;

export type FabricPluginList = FabricPlugin[];

export enum FabricGridConfigEnum {
  Grid_Big_Editable = 'gridBigEditable',
  Grid_Big_Line_Color = 'gridBigLineColor',
  Grid_Big_Line_Opacity = 'gridBigLineOpacity',
  Grid_Big_Line_Stroke = 'gridBigLineStroke',
  Grid_Big_Size = 'gridBigSize',
  Grid_Small_Editable = 'gridSmallEditable',
  Grid_Small_Line_Color = 'gridSmallLineColor',
  Grid_Small_Line_Opacity = 'gridSmallLineOpacity',
  Grid_Small_Line_Stroke = 'gridSmallLineStroke',
  Grid_Small_Size = 'gridSmallSize',
}
export interface FabricGridConfig {
  /**
   * @标题 大网格是否可编辑
   * @描述  大网格是否可编辑
   * @默认值 false
   */
  [FabricGridConfigEnum.Grid_Big_Editable]?: boolean;
  /**
   * @标题 大网格线颜色
   * @描述 大网格线颜色
   * @默认值 '#20e512'
   */
  [FabricGridConfigEnum.Grid_Big_Line_Color]?: string;
  /**
   * @标题 大网格线透明度
   * @描述 大网格线透明度
   * @默认值 0.4
   */
  [FabricGridConfigEnum.Grid_Big_Line_Opacity]?: number;
  /**
   * @标题 大网格线宽度
   * @描述 大网格线宽度
   * @默认值 0.5
   */
  [FabricGridConfigEnum.Grid_Big_Line_Stroke]?: number;
  /**
   * @标题 大网格大小
   * @描述 大网格大小=大网格大小是小网格大小的整数倍，网格渲染最好看
   * @默认值 15
   */
  [FabricGridConfigEnum.Grid_Big_Size]?: number;
  /**
   * @标题 小网格是否可编辑
   * @描述 小网格是否可编辑
   * @默认值 false
   */
  [FabricGridConfigEnum.Grid_Small_Editable]?: boolean;

  /**
   * @标题 小网格线颜色
   * @描述 小网格线颜色
   * @默认值 '#20e512'
   */
  [FabricGridConfigEnum.Grid_Small_Line_Color]?: string;
  /**
   * @标题 小网格线透明度
   * @描述 小网格线透明度
   * @默认值 0.4
   */
  [FabricGridConfigEnum.Grid_Small_Line_Opacity]?: number;
  /**
   * @标题 小网格线宽度
   * @描述 小网格线宽度
   * @默认值 0.5
   */
  [FabricGridConfigEnum.Grid_Small_Line_Stroke]?: number;
  /**
   * @标题 小网格大小
   * @描述 小网格大小=大网格大小是小网格大小的整数倍，网格渲染最好看
   * @默认值 60
   */
  [FabricGridConfigEnum.Grid_Small_Size]?: number;
}

export interface FabricFilters {
  /**
   * @标题 模糊
   * @范围
   * @默认值 0
   */
  blur: number;
  /**
   * @标题 亮度
   * @默认值 0
   */
  brightness: number;
  /**
   * @标题 对比度
   * @默认值 0
   */
  contrast: number;
  /**
   * @标题 饱和度
   * @默认值 0
   */
  saturation: number;
  /**
   * @标题 鲜艳
   * @默认值 0
   */
  vibrance: number;
  /**
   * @标题 灰度
   */
  // grayscale?: 'average' | 'lightness' | 'luminosity';
}

export enum FabricBackgroundConfigEnum {
  Background_Color = 'backgroundColor',
  Background_Editable = 'backgroundEditable',
  Background_Image = 'backgroundImage',
  Filters_Blend_Alpha = 'blendAlpha',
  Filters_Blend_Color = 'blendColor',
  Filters_Blend_Mode = 'blendMode',
  Filters_Blocksize = 'blocksize',
  Filters_Blur = 'blur',
  Filters_Brightness = 'brightness',
  Filters_Contrast = 'contrast',
  Filters_Invert = 'invert',
  Filters_Noise = 'noise',
  Filters_Rotation = 'rotation',
  Filters_Saturation = 'saturation',
  Filters_Vibrance = 'vibrance',
}
export interface FabricBackgroundConfig {
  /**
   * @标题 背景颜色
   */
  [FabricBackgroundConfigEnum.Background_Color]?: string;
  /**
   * @标题 背景渲染
   * @描述 背景是否渲染
   * @默认值 false
   */
  [FabricBackgroundConfigEnum.Background_Editable]?: boolean;
  /**
   * @标题 背景图片
   */
  [FabricBackgroundConfigEnum.Background_Image]?: string;
  /**
   * @标题 混合透明度
   * @默认值 1
   */
  [FabricBackgroundConfigEnum.Filters_Blend_Alpha]?: number;
  /**
   * @标题 混合颜色
   * @默认值 undefined
   */
  [FabricBackgroundConfigEnum.Filters_Blend_Color]?: string;

  /**
   * @标题 混合模式
   * @默认值 'multiply'
   * @范围 'multiply' | 'add' | 'difference' | 'screen' | 'subtract' | 'darken' | 'lighten' | 'overlay' | 'exclusion' | 'tint'
   */
  [FabricBackgroundConfigEnum.Filters_Blend_Mode]?: filters.TBlendMode;
  /**
   * @标题 像素化
   * @默认值 0
   */
  [FabricBackgroundConfigEnum.Filters_Blocksize]?: number;
  /**
   * @标题 模糊
   * @默认值 0
   * @范围 0-1
   */
  [FabricBackgroundConfigEnum.Filters_Blur]?: number;

  /**
   * @标题 亮度
   * @默认值 0
   * @范围 -1-1
   */
  [FabricBackgroundConfigEnum.Filters_Brightness]?: number;
  /**
   * @标题 对比度
   * @默认值 0
   * @范围 -1-1
   */
  [FabricBackgroundConfigEnum.Filters_Contrast]?: number;
  /**
   * @标题 反色
   * @默认值 false
   */
  [FabricBackgroundConfigEnum.Filters_Invert]?: boolean;
  /**
   * @标题 噪声
   * @默认值 0
   */
  [FabricBackgroundConfigEnum.Filters_Noise]?: number;

  /**
   * @标题 色相旋转
   * @默认值 0
   * @范围 -1-1
   */
  [FabricBackgroundConfigEnum.Filters_Rotation]?: number;
  /**
   * @标题 饱和度
   * @默认值 0
   * @范围 -1-1
   */
  [FabricBackgroundConfigEnum.Filters_Saturation]?: number;
  /**
   * @标题 鲜艳
   * @默认值 0
   * @范围 -1-1
   */
  [FabricBackgroundConfigEnum.Filters_Vibrance]?: number;
}

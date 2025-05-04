import type { FabricBackgroundConfig } from '../../type';

import { filters } from 'fabric';
import { isEqual, throttle } from 'lodash-es';

import { ImageClass } from '../api/objects';
import { FabricRanderClass } from '../FabricRanderClass';

/**
 * @标题 背景图和背景颜色
 * @描述 负责管理画布的背景图和背景颜色
 * @参数 fabricRender - 画布渲染实例
 * @独立 在进行测试后发现，对图片进行filters处理后，操作撤销和恢复会导致异常和卡顿所以将其改为组件配合fabric事件来实现
 */
export class FabricBackgroundClass {
  backgroundImage!: ImageClass;
  /**
   * 设置背景图片滤镜
   * @参数 filterType 'Blur' 对图像应用高斯模糊效果，使图像变得模糊 | 取值范围 0-1
   * @参数 filterType 'Brightness' 调整图像的亮度，正值增加亮度，负值降低亮度 | 取值范围 -1-1
   * @参数 filterType 'Contrast'  调整图像的对比度，正值增加对比度，负值降低对比度 | 取值范围 -1-1
   * @参数 filterType 'Saturation' 调整图像的颜色饱和度，正值增加饱和度，负值降低饱和度。 |
   * @参数 filterType 'Vibrance' 选择性地增加图像中不饱和颜色的饱和度，保持已经饱和的颜色不变。比普通饱和度滤镜更智能。
   * @参数 filterValue 滤镜值
   */
  type = 'background';
  private config: FabricBackgroundConfig = {
    backgroundColor: undefined,
    backgroundEditable: false,
    backgroundImage: undefined,
    // blendAlpha: 1,
    // blendColor: '#000',
    // blendMode: 'multiply',
    // blocksize: 8,
    blur: 0,
    brightness: 0,
    contrast: 0,
    // invert: false,
    noise: 0,
    rotation: 0,
    saturation: 0,
    vibrance: 0,
  };
  private debouncedSetBackgroundImage = throttle(() => {
    this.setBackgroundImage();
  }, 300);

  private fabricRender!: FabricRanderClass;

  constructor(
    fabricRender: FabricRanderClass,
    config?: FabricBackgroundConfig,
  ) {
    this.fabricRender = fabricRender;
    this.config = Object.assign(this.config, config);
    this.initializeBackgroundControls();
  }
  /**
   * 获取配置值
   */
  getConfig(prop?: keyof FabricBackgroundConfig): any | FabricBackgroundConfig {
    if (!prop) return this.config;
    return this.config[prop];
  }

  /**
   * 初始化背景图和颜色
   */
  initializeBackgroundControls() {
    if (!this.config.backgroundEditable) return this.remove();
    this.fabricRender.$$.set({
      backgroundColor: this.config.backgroundColor || undefined,
    });
    if (this.config.backgroundImage) {
      this.debouncedSetBackgroundImage();
    } else {
      this.fabricRender.$$.set({ backgroundImage: undefined });
    }
  }

  remove() {
    this.fabricRender.$$.set({
      backgroundColor: undefined,
      backgroundImage: undefined,
    });
  }

  /**
   * 设置背景图片
   */
  setBackgroundImage() {
    const img = new Image();

    img.addEventListener('error', () => {
      this.fabricRender.$$.set({ backgroundImage: undefined });
    });
    img.src = this.config.backgroundImage || '';
    img.addEventListener('load', async () => {
      const { scaleX, scaleY } = this.calculateImageScale(img);
      this.backgroundImage = new ImageClass({
        dataSet: {
          src: this.config.backgroundImage,
        },
      });
      this.backgroundImage.set({ scaleX, scaleY });
      this.backgroundImage.filters = [
        new filters.Brightness({ brightness: this.config.brightness }),
        new filters.Contrast({ contrast: this.config.contrast }),
        new filters.Blur({ blur: this.config.blur }),
        new filters.Saturation({ saturation: this.config.saturation }),
        new filters.Vibrance({ vibrance: this.config.vibrance }),
        new filters.HueRotation({ rotation: this.config.rotation }),
        new filters.Noise({ noise: this.config.noise }),
        new filters.Resize({ scaleX, scaleY }),
      ];
      this.backgroundImage.applyFilters();
      this.fabricRender.$$.set({ backgroundImage: this.backgroundImage });
    });
  }

  /**
   * 设置配置并初始化背景
   * @param config 背景配置
   */
  setConfig(config: FabricBackgroundConfig) {
    if (isEqual(this.config, config)) return;
    this.config = Object.assign(this.config, config);
    this.initializeBackgroundControls();
  }

  private calculateImageScale(img: HTMLImageElement) {
    const canvasWidth = this.fabricRender.$$.getWidth();
    const canvasHeight = this.fabricRender.$$.getHeight();
    return {
      scaleX: canvasWidth / img.width,
      scaleY: canvasHeight / img.height,
    };
  }
}

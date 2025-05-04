import type { FabricGridConfig } from '../../type';

import { FabricObject, Group, Line, Path } from 'fabric';
import { isEqual } from 'lodash-es';

import { FabricRanderClass } from '../FabricRanderClass';

/**
 * @title 背景网格
 * @description 背景网格
 * @constructor fabricRender: FabricRanderClass
 */
export class FabricGridClass {
  group!: Group;
  h: (Line | Path)[] = [];
  type = 'grid';
  v: (Line | Path)[] = [];
  private config: Required<FabricGridConfig> = {
    gridBigEditable: false,
    gridBigLineColor: 'rgba(32, 229, 18, 1)',
    gridBigLineOpacity: 1,
    gridBigLineStroke: 0.5,
    gridBigSize: 60,
    gridSmallEditable: false,
    gridSmallLineColor: 'rgba(32, 229, 18, 1)',
    gridSmallLineOpacity: 0.4,
    gridSmallLineStroke: 0.5,
    gridSmallSize: 15,
  };

  private fabricRender!: FabricRanderClass;

  constructor(fabricRender: FabricRanderClass, config?: FabricGridConfig) {
    this.fabricRender = fabricRender;
    if (config) {
      this.config = { ...this.config, ...config };
    }
    this.initializeGridControls();
  }

  /**
   * 获取配置值
   */
  getConfig(prop?: keyof FabricGridConfig): any | FabricGridConfig {
    if (!prop) return this.config;
    return this.config[prop];
  }

  /**
   * 初始化网格
   * 如果editable为true，则初始化网格，否则不初始化
   */
  initializeGridControls() {
    this.remove();

    if (!this.config.gridBigEditable && !this.config.gridSmallEditable) return;

    const width = this.fabricRender.$$.getWidth();
    const height = this.fabricRender.$$.getHeight();

    // scaleX:X轴缩放倍数, scaleY:Y轴缩放倍数, stageX:左上角远点偏移, stageY:右上角远点偏移
    const [scaleX, _b, _c, scaleY, stageX, stageY] = this.fabricRender.$$
      .viewportTransform as [number, number, number, number, number, number];

    // 创建小网格
    if (this.config.gridSmallEditable) {
      this.createGrid(true, width, height, scaleX, scaleY, stageX, stageY);
    }

    // 创建大网格
    if (this.config.gridBigEditable) {
      this.createGrid(false, width, height, scaleX, scaleY, stageX, stageY);
    }

    // 创建组
    this.group = new Group([...this.v, ...this.h], {
      evented: false,
      selectable: false,
    });

    this.group.set('ignoreElement', true);
    this.fabricRender.$$.add(this.group);
    this.fabricRender.$$.sendObjectToBack(this.group);
  }

  /**
   * 移除网格
   */
  remove() {
    if (!this.group) return;

    this.group.getObjects().forEach((obj: FabricObject) => {
      this.fabricRender.$$.remove(obj);
    });

    this.fabricRender.$$.remove(this.group);
    this.v = [];
    this.h = [];
  }

  /**
   * 设置配置并重新初始化网格
   */
  setConfig(config: FabricGridConfig) {
    if (isEqual(this.config, config)) return;
    Object.assign(this.config, config);
    this.initializeGridControls();
  }

  /**
   * 创建一组网格
   */
  private createGrid(
    isSmallGrid: boolean,
    width: number,
    height: number,
    scaleX: number,
    scaleY: number,
    stageX: number,
    stageY: number,
  ) {
    const config = this.config;
    const gridSize = isSmallGrid ? config.gridSmallSize : config.gridBigSize;
    const options = {
      opacity: isSmallGrid
        ? config.gridSmallLineOpacity
        : config.gridBigLineOpacity,
      stroke: isSmallGrid ? config.gridSmallLineColor : config.gridBigLineColor,
      strokeWidth: isSmallGrid
        ? config.gridSmallLineStroke
        : config.gridBigLineStroke,
    };

    // 计算网格参数
    const lenX = Math.ceil(width / scaleX / gridSize);
    const lenY = Math.ceil(height / scaleY / gridSize);
    const startX = -Math.ceil(stageX / scaleX / gridSize);
    const startY = -Math.ceil(stageY / scaleY / gridSize);

    // 竖线
    for (let x = startX; x < lenX + startX + 1; x++) {
      const x1 = gridSize * x;
      const y1 = -stageY / scaleY;
      const x2 = gridSize * x;
      const y2 = (height - stageY) / scaleY;

      this.v.push(this.createGridLine(x1, y1, x2, y2, options));
    }

    // 横线
    for (let y = startY; y < lenY + startY + 1; y++) {
      const x1 = -stageX / scaleX;
      const y1 = gridSize * y;
      const x2 = (width - stageX) / scaleX;
      const y2 = gridSize * y;

      this.h.push(this.createGridLine(x1, y1, x2, y2, options));
    }
  }

  /**
   * 创建网格线
   */
  private createGridLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    options: {
      opacity: number;
      stroke: string;
      strokeWidth: number;
    },
  ): Path {
    return new Path(`M ${x1},${y1} L ${x2},${y2}`, {
      evented: false,
      opacity: options.opacity,
      selectable: false,
      stroke: options.stroke,
      strokeUniform: true,
      strokeWidth: options.strokeWidth,
    });
  }
}

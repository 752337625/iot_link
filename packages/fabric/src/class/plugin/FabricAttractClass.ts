import { ActiveSelection, FabricObject, Group, Line, Point } from 'fabric';

import { FabricRanderClass } from '../FabricRanderClass';
/**
 * @title 吸附和辅助线
 * @description 吸附和辅助线
 * @constructor fabricRender: FabricRanderClass
 */
export class FabricAttractClass {
  // 辅助线偏移
  static GUIDELINE_OFFSET: number = 4;
  // 吸附偏移
  static SNAP_OFFSET: number = 2;
  // 吸附水平锁
  flagLockHorizontal: boolean = true;
  // 吸附垂直锁
  flagLockVertical: boolean = false;
  group!: Group;
  type: string = 'attract';
  private fabricRender!: FabricRanderClass;
  constructor(fabricRender: FabricRanderClass) {
    this.fabricRender = fabricRender;
    this.onHandler(); // 初始化订阅主题
  }
  drawGuides(
    target: FabricObject | undefined,
    lineGuideStops?: { horizontal: number[]; vertical: number[] },
    itemBounds?: { horizontal: number[]; vertical: number[] },
  ) {
    if (!target || !lineGuideStops || !itemBounds) return;
    const vertical = new Set<number>();
    const horizontal = new Set<number>();

    // 记录需要吸附的位置
    let snapX: null | number = null;
    let snapY: null | number = null;

    lineGuideStops.horizontal.forEach((lineGuide: number) => {
      itemBounds.horizontal.forEach((itemBound: number) => {
        const diff = Math.abs(lineGuide - itemBound);
        // 辅助线
        if (diff <= FabricAttractClass.GUIDELINE_OFFSET)
          horizontal.add(lineGuide);
        // 吸附功能
        if (diff <= FabricAttractClass.SNAP_OFFSET) {
          snapY = lineGuide - itemBound + target.top;
        }
      });
    });

    lineGuideStops.vertical.forEach((lineGuide: number) => {
      itemBounds.vertical.forEach((itemBound: number) => {
        const diff = Math.abs(lineGuide - itemBound);
        // 辅助线
        if (diff <= FabricAttractClass.GUIDELINE_OFFSET)
          vertical.add(lineGuide);
        // 吸附功能
        if (diff <= FabricAttractClass.SNAP_OFFSET) {
          snapX = lineGuide - itemBound + target.left;
        }
      });
    });

    // 应用吸附
    if (snapX !== null && !this.flagLockVertical) {
      target.set({ left: snapX });
    }

    if (snapY !== null && this.flagLockHorizontal) {
      target.set({ top: snapY });
    }

    const v: Line[] = [];
    const h: Line[] = [];
    const { bl, tl, tr } = this.fabricRender.$$.vptCoords;
    // 画线
    horizontal.forEach((point?: number) => {
      h.push(
        new Line([tl.x, tl.y, tr.x, tr.y], {
          hasBorders: false,
          selectable: false,
          stroke: 'rgb(255,0,0,0.9)',
          strokeDashArray: [5, 5],
          strokeUniform: false,
          strokeWidth: 1,
          top: point,
        }),
      );
    });
    vertical.forEach((point?: number) => {
      v.push(
        new Line([tl.x, tl.y, bl.x, bl.y], {
          hasBorders: false,
          left: point,
          selectable: false,
          stroke: 'rgb(255,0,0,0.9)',
          strokeDashArray: [5, 5],
          strokeUniform: false,
          strokeWidth: 1,
        }),
      );
    });
    this.remove();
    //  创建组
    this.group = new Group([...v, ...h], {
      evented: false, // 禁止交互
      selectable: false, // 禁止选择
    });
    this.group.set({ ignoreElement: true });
    this.fabricRender.$$.add(this.group);
  }
  getLineGuideStops(target: FabricObject | undefined) {
    if (!target) return;
    const vertical: number[] = [];
    const horizontal: number[] = [];
    const canvas = this.fabricRender.$$;
    // 如果目标元素是activeSelection，则需要排除activeSelection 内部元素
    // 获取其他元素点信息
    if (target?.type === 'activeselection') {
      const selectObject =
        this.fabricRender.$$.getActiveObject() as ActiveSelection;
      const a = selectObject?.getObjects();
      canvas.getObjects().forEach((obj) => {
        const cur = a.find((i) => i === obj);
        if (obj.ignoreElement || cur) return;
        if (obj?.oCoords?.ml) {
          // 规范坐标
          const { horizontal: h, vertical: v } = this.ruleCollect(obj);
          horizontal.push(...h);
          vertical.push(...v);
        } else {
          // 非规范坐标
          const { horizontal: h, vertical: v } = this.ruleNotCollect(obj);
          horizontal.push(...h);
          vertical.push(...v);
        }
      });
    } else {
      canvas.getObjects().forEach((obj) => {
        if (obj.ignoreElement || obj === target) return;
        if (obj?.oCoords?.ml) {
          // 规范坐标
          const { horizontal: h, vertical: v } = this.ruleCollect(obj);
          horizontal.push(...h);
          vertical.push(...v);
        } else {
          // 非规范坐标
          const { horizontal: h, vertical: v } = this.ruleNotCollect(obj);
          horizontal.push(...h);
          vertical.push(...v);
        }
      });
    }
    return {
      horizontal,
      vertical,
    };
  }
  // 收集目标元素坐标
  getObjectSnappingEdges(obj?: FabricObject) {
    if (!obj || !obj.oCoords) return;
    if (obj.oCoords?.ml) {
      // 规范坐标
      const { horizontal, vertical } = this.ruleCollect(obj);
      return {
        horizontal,
        vertical,
      };
    } else {
      // 不规范坐标
      const { horizontal, vertical } = this.ruleNotCollect(obj);
      return {
        horizontal,
        vertical,
      };
    }
  }
  onHandler() {
    this.fabricRender.$$.on('object:moving', (opt) => {
      const target: FabricObject = opt.target as FabricObject;
      const itemBounds = this.getObjectSnappingEdges(target);
      const lineGuideStops = this.getLineGuideStops(target);
      this.drawGuides(target, lineGuideStops, itemBounds);
    });
    this.fabricRender.$$.on('object:scaling', (opt) => {
      const target: FabricObject = opt.target as FabricObject;
      const itemBounds = this.getObjectSnappingEdges(target);
      const lineGuideStops = this.getLineGuideStops(target);
      this.drawGuides(target, lineGuideStops, itemBounds);
    });
    this.fabricRender.$$.on('object:rotating', (opt) => {
      const target: FabricObject = opt.target as FabricObject;
      const itemBounds = this.getObjectSnappingEdges(target);
      const lineGuideStops = this.getLineGuideStops(target);
      this.drawGuides(target, lineGuideStops, itemBounds);
    });
    this.fabricRender.$$.on('object:rotating', (opt) => {
      const target: FabricObject = opt.target as FabricObject;
      const itemBounds = this.getObjectSnappingEdges(target);
      const lineGuideStops = this.getLineGuideStops(target);
      this.drawGuides(target, lineGuideStops, itemBounds);
    });
    this.fabricRender.$$.on('mouse:up', () => {
      this.remove();
    });
    // this.fabricRender.$$.on('mouse:down', (_opt) => {
    //   console.log(`mouse:down：${_opt}`);
    // });
    // this.fabricRender.$$.on('mouse:move', (_opt) => {
    //   console.log(`mouse:move：${_opt}`);
    // });
    // 可以使用这俩个方法做撤销和还原
    // this.fabricRender.$$.on('object:modified', (opt) => {
    //   console.log(`modified：${opt}`);
    // });
    // this.fabricRender.$$.on('object:added', (opt) => {
    //   console.log(`added：${opt}`);
    // });
  }
  remove() {
    if (this.group) {
      this.group.getObjects().forEach((obj: FabricObject) => {
        this.fabricRender.$$.remove(obj);
      });
      this.fabricRender.$$.remove(this.group);
    }
  }
  // 收集规范坐标
  ruleCollect(target: FabricObject) {
    const { height, left, top, width } = target.getBoundingRect();
    // v6 中不再使用 restorePointerVpt
    return {
      horizontal: [top, top + height / 2, top + height],
      vertical: [left, left + width / 2, left + width],
    };
  }

  // 收集非规范坐标
  ruleNotCollect(target: FabricObject) {
    // 非规范坐标
    const horizontal: number[] = [];
    const vertical: number[] = [];

    for (const key in target.oCoords) {
      const point = target?.oCoords[key] as Point;
      // v6 中直接使用坐标点
      horizontal.push(point.y);
      vertical.push(point.x);
    }

    return {
      horizontal,
      vertical,
    };
  }
}

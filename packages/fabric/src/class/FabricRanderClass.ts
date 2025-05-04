import type { CanvasOptions } from 'fabric';

import { ActiveSelection, Canvas, util } from 'fabric';

import { FabricApiClass } from './plugin/FabricApiClass';
import { FabricAttractClass } from './plugin/FabricAttractClass';
import { FabricAttributeClass } from './plugin/FabricAttributeClass';
import { FabricContextMenuClass } from './plugin/FabricContextMenuClass';
import { FabricDragLayoutClass } from './plugin/FabricDragLayoutClass';
import { FabricPluginsClass } from './plugin/FabricPluginsClass';
import { FabricToolClass } from './plugin/FabricToolClass';

/**
 * Fabric 画布渲染类
 * 负责创建和管理 Fabric.js 画布及其相关插件
 * 继承自 FabricPluginsClass，用于管理画布的各种功能模块
 */
export class FabricRanderClass extends FabricPluginsClass {
  /** Fabric.js Canvas 实例 */
  $$!: Canvas;
  /** 画布元素 ID */
  elIdRef!: string;
  /** 画布配置选项 */
  option!: Partial<CanvasOptions> | undefined;
  /** 画布父容器 ID */
  parentIdRef!: string;

  /**
   * 构造函数 - 创建并初始化画布
   *
   * @param elIdRef 画布元素 ID，用于定位和创建画布
   * @param parentIdRef 画布父容器 ID，用于定位父容器
   * @param options 画布配置选项，自定义画布行为
   */
  constructor(
    elIdRef: string,
    parentIdRef: string,
    options?: Partial<CanvasOptions> | undefined,
  ) {
    super();
    this.elIdRef = elIdRef;
    this.parentIdRef = parentIdRef;
    this.option = options;
    this.$$ = new Canvas(`${this.elIdRef}`, {
      backgroundVpt: false, // 不受视口变换影响（也就是不管拖拽还是缩放画布，背景图都不受影响）
      fireMiddleClick: true, // 画布是否可以出触发中键
      fireRightClick: true, // 画布是否可以出触发右键
      hoverCursor: 'pointer', // 鼠标悬停时的光标样式
      moveCursor: 'move', // 移动时的光标样式
      preserveObjectStacking: true, // 保持对象堆叠
      renderOnAddRemove: true, // 添加或删除对象时是否重新渲染画布
      selectionBorderColor: 'red', // 选中边框颜色
      selectionDashArray: [5], // 选中边框虚线
      selectionKey: 'ctrlKey', // 多选按键 ctrl
      stopContextMenu: true, // 禁用浏览器默认右键菜单
      // altSelectionKey: 'altKey', // 选中元素后，按住alt键，选择被遮挡的部分也能移动当前选中的元素
      // backgroundColor: 'rgba(255,255,255,1)',
      // backgroundColor: '#000A30FF',
      // backgroundColor: '#ccc',
      // overlayImage:
      // overlayVpt: false, // 如果设置为假覆盖图像不受视口变换的影响
      ...this.option,
    });
    this.initializePlugins(); // 初始化插件（右键菜单、网格、组态组件等）
    this.initializeComponents(); // 初始化并渲染基础组件
    this.setupAnimationFrame(); // 设置动画帧，确保画布持续更新
  }

  /**
   * 获取当前活动对象
   * @returns 当前选中的对象（ActiveSelection类型）
   */
  getActiveObject() {
    return this.$$.getActiveObject() as ActiveSelection;
  }

  /**
   * 初始化并渲染基础组件
   * 用于初始化渲染时的一些特殊处理
   */
  initializeComponents() {}

  /**
   * 重写父类的初始化插件方法
   * 初始化所有功能插件，包括画布属性、缩放、拖拽、右键菜单、吸附辅助线、工具和API等
   */
  override initializePlugins() {
    // 设置画布属性
    this.attribute = new FabricAttributeClass(this);
    // // 滚动缩放画布
    // this.zoom = new FabricZoomClass(this);
    // 拖拽画布
    this.dragLayout = new FabricDragLayoutClass(this);
    // 渲染右键菜单
    this.contextMenu = new FabricContextMenuClass(this);
    // 吸附以及辅助线
    this.attract = new FabricAttractClass(this);
    // 渲染工具
    this.tool = new FabricToolClass(this);
    // 渲染组态组件
    this.api = new FabricApiClass(this);
  }
  /**
   * 刷新画布内容
   * 重新渲染网格和更新图层管理器样式
   */
  refreshCanvas(props?: {
    background?: boolean;
    grid?: boolean;
    tool?: boolean;
  }) {
    if (props) {
      props?.grid && this.grid && this.grid.initializeGridControls(); // 重新渲染网格
      props?.tool && this.tool && this.tool.switchLayerManagerStyle(); // 切换图层样式
      props?.background &&
        this.background &&
        this.background.initializeBackgroundControls(); // 重新渲染背景
    } else {
      this.grid && this.grid.initializeGridControls(); // 重新渲染网格
      this.tool && this.tool.switchLayerManagerStyle(); // 切换图层样式
      this.background && this.background.initializeBackgroundControls(); // 重新渲染背景
    }
  }

  /**
   * 将网格置于画布底层
   * 确保网格显示在所有其他对象的下方
   */
  sendGridToBack() {
    this.grid && this.$$.sendObjectToBack(this.grid.group);
  }

  /**
   * 设置动画帧
   * 使用 requestAnimFrame 确保画布持续重新渲染
   */
  setupAnimationFrame() {
    const animationFrame = () => {
      this.$$.requestRenderAll();
      util.requestAnimFrame(animationFrame);
    };
    animationFrame();
  }
}

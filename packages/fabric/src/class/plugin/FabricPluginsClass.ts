import type { FabricPlugin, FabricPluginList } from '../../type';

// import { DistanceGuide } from './tool/distance-guide';
import { FabricApiClass } from './FabricApiClass';
import { FabricAttractClass } from './FabricAttractClass';
import { FabricAttributeClass } from './FabricAttributeClass';
import { FabricBackgroundClass } from './FabricBackgroundClass';
import { FabricContextMenuClass } from './FabricContextMenuClass';
import { FabricDragLayoutClass } from './FabricDragLayoutClass';
import { FabricEventEmitter } from './FabricEventEmitter';
import { FabricGridClass } from './FabricGridClass';
import { FabricToolClass } from './FabricToolClass';
import { FabricZoomClass } from './FabricZoomClass';

/**
 * Fabric 插件基类
 * 负责管理所有画布相关的插件功能
 * 继承自事件发射器，支持事件订阅和触发
 */
export class FabricPluginsClass extends FabricEventEmitter {
  /** 渲染组态组件插件 */
  api!: FabricApiClass;
  /** 吸附和辅助线插件 */
  attract!: FabricAttractClass;
  /** 设置画布属性插件 */
  attribute!: FabricAttributeClass;
  /** 背景（图和色）插件 */
  background!: FabricBackgroundClass;
  /** 右键菜单插件 */
  contextMenu!: FabricContextMenuClass;
  /** 拖拽画布插件 */
  dragLayout!: FabricDragLayoutClass;
  /** 背景网格插件 */
  grid!: FabricGridClass;
  /** 工具插件 */
  tool!: FabricToolClass;
  /** 缩放画布插件 */
  zoom!: FabricZoomClass;

  /**
   * 绑定插件到实例
   * 将插件对象绑定到当前实例的对应属性上
   *
   * @param plugins 要绑定的插件或插件列表
   */
  bindingPlugins(plugins: FabricPlugin | FabricPluginList) {
    if (Array.isArray(plugins)) {
      plugins.forEach((plugin: FabricPlugin) => {
        (this as any)[plugin.type] = plugin;
      });
    } else {
      (this as any)[plugins.type] = plugins;
    }
  }

  /**
   * 初始化所有插件
   * 包括画布属性、缩放、拖拽、右键菜单、吸附辅助线、工具和API等功能
   * 此方法应由子类实现
   */
  initializePlugins() {
    // 此方法应由子类实现
  }

  /**
   * 解除插件绑定
   * 将绑定的插件从当前实例移除
   *
   * @param plugins 要解除绑定的插件或插件列表
   */
  unbindingPlugins(plugins: FabricPlugin | FabricPluginList) {
    if (Array.isArray(plugins)) {
      plugins.forEach((plugin: FabricPlugin) => {
        (this as any)[plugin.type] = null;
      });
    } else {
      (this as any)[plugins.type] = null;
    }
  }
}

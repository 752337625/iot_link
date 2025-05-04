import { FabricObject } from 'fabric';
import { debounce } from 'lodash-es';

import { propertiesToInclude } from '../const';
import { FabricRanderClass } from '../FabricRanderClass';

/**
 * 历史记录管理类
 * 负责实现画布操作的撤销和重做功能
 */
export class HistoryManagerClass {
  // 当前历史记录索引位置
  historyIndex: number = -1;
  // 历史记录最大存储条数
  historyLimit: number = 10;
  // 历史记录存储数组
  historyStore: any[] = [];
  /**
   * 重做操作
   * 恢复之前撤销的操作
   * 使用debounce防止频繁调用
   */
  redo = debounce(() => {
    // 如果已经是最新状态，则不执行任何操作
    if (this.historyIndex >= this.historyStore.length - 1) return;
    // 前进到下一个历史记录
    this.historyIndex++;
    // 渲染该历史状态
    this.applyHistoryState();
  }, 500);

  /**
   * 撤销操作
   * 回退到上一个历史状态
   * 使用debounce防止频繁调用
   */
  undo = debounce(() => {
    // 如果已经是最初状态，则不执行任何操作
    if (this.historyIndex <= 0) return;
    // 回退到上一个历史记录
    this.historyIndex--;
    // 渲染该历史状态
    this.applyHistoryState();
  }, 500);

  // Fabric渲染实例引用
  private fabricRender!: FabricRanderClass;

  /**
   * 构造函数
   * @param fabricRender - Fabric渲染实例
   */
  constructor(fabricRender: FabricRanderClass) {
    this.fabricRender = fabricRender;
    // 初始化工具函数和事件监听
    this.initialize();
  }
  /**
   * 绑定DOM元素事件
   * @param selector - 元素选择器
   * @param callback - 点击回调函数
   */
  bindDOMEvent(selector: string, callback: () => void) {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      element.addEventListener('click', callback);
      // 这里可以添加更多逻辑来处理按钮的其他事件或样式
    }
  }
  /**
   * 绑定历史操作UI控件
   * 绑定撤销和重做按钮的点击事件
   */
  bindUIControls() {
    this.bindDOMEvent('#fabric-tool-parent-span-undo', this.undo.bind(this));
    this.bindDOMEvent('#fabric-tool-parent-span-redo', this.redo.bind(this));
  }

  /**
   * 初始化历史管理器
   * 设置事件监听和按钮绑定
   */
  initialize() {
    this.registerEventListeners();
    this.bindUIControls();
  }

  /**
   * 注册历史记录相关的事件监听
   * 监听对象修改、元素添加更新等事件，触发历史记录添加
   */
  registerEventListeners() {
    // 监听对象修改事件
    this.fabricRender.$$.on('object:modified', this.saveState.bind(this));
    // 监听手动添加历史记录事件
    this.fabricRender.on('fabric-add-history', this.saveState.bind(this));
  }

  /**
   * 添加历史记录
   * 在画布状态改变时调用，将当前状态保存到历史记录中
   */
  saveState() {
    // 获取当前画布的对象数据
    const data = this.fabricRender.$$.toObject(propertiesToInclude);

    // 移除背景图像，不纳入历史记录
    // delete data.backgroundImage;
    // delete data.background;
    // 过滤掉需要忽略的对象
    data.objects = data.objects.filter(
      (object: FabricObject) => !object.ignoreElement,
    );

    // 如果当前历史索引小于历史记录长度，截断历史记录
    // 这是为了在撤销后进行新操作时，清除之前被撤销的记录
    if (this.historyIndex < this.historyStore.length - 1) {
      this.historyStore = this.historyStore.slice(0, this.historyIndex + 1);
    }

    // 将当前数据添加到历史记录中
    this.historyStore.push(data);

    // 如果历史记录超过限制，移除最早的记录
    if (this.historyStore.length > this.historyLimit) {
      this.historyStore.shift();
    } else {
      // 否则增加历史索引
      this.historyIndex++;
    }

    // 更新历史记录计数显示
    this.updateHistoryCounters();
  }

  /**
   * 应用历史状态到画布
   * 根据当前historyIndex加载对应的历史状态
   * @private
   */
  private applyHistoryState() {
    const data = this.historyStore[this.historyIndex];
    if (!data) return;
    // 深拷贝数据避免引用问题
    const dataJson = structuredClone(data);
    // 加载历史状态到画布
    this.fabricRender.$$.loadFromJSON(dataJson).then(() => {
      // 通知画布刷新
      this.fabricRender.refreshCanvas();
      // 更新历史记录计数显示
      this.updateHistoryCounters();
    });
  }

  /**
   * 更新单个计数器显示
   * @param selector - 显示元素选择器
   * @param count - 计数值
   * @private
   */
  private updateCounter(selector: string, count: number) {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) element.innerText = `（${count}）`;
  }

  /**
   * 更新所有历史记录计数显示
   * 包括撤销和重做的可用次数
   * @private
   */
  private updateHistoryCounters() {
    // 更新撤销计数，当前索引即为可撤销的次数
    this.updateCounter('#fabric-undo-count', this.historyIndex);
    // 更新重做计数，总长度减去当前索引再减1
    const redoCount = this.historyStore.length - 1 - this.historyIndex;
    this.updateCounter('#fabric-redo-count', Math.max(redoCount, 0));
  }
}

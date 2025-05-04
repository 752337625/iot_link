import { FabricRanderClass } from '../FabricRanderClass';
import { layerHtml } from '../html/layer_html';
import { toolHtml } from '../html/tool_html';
import { HistoryManagerClass } from '../tool/HistoryManagerClass';
import { LayerManagerClass } from '../tool/LayerManagerClass';
/**
 * @title 顶部工具栏
 * @description 顶部工具栏：图层管理、历史记录
 * @constructor fabricRender: FabricRanderClass
 */
export class FabricToolClass {
  historyManager!: HistoryManagerClass;
  layerManager!: LayerManagerClass;
  type = 'tool';
  private fabricRender!: FabricRanderClass;
  constructor(fabricRender: FabricRanderClass) {
    this.fabricRender = fabricRender;
    this.initializeToolControls();
    this.historyManager = new HistoryManagerClass(fabricRender);
    this.layerManager = new LayerManagerClass(fabricRender);
  }
  // 创建工具元素栏
  initializeToolControls() {
    const toolParentDiv = document.createElement('div');
    toolParentDiv.innerHTML = toolHtml;
    const layerParentDiv = document.createElement('div');
    layerParentDiv.innerHTML = layerHtml;
    const parent = document.querySelector(
      `.${this.fabricRender.$$.containerClass}`,
    ) as HTMLElement;
    // 使用文档片段
    const fragment = document.createDocumentFragment();
    fragment.append(toolParentDiv);
    fragment.append(layerParentDiv);
    parent.append(fragment);
  }
  switchLayerManagerStyle() {
    this.layerManager.updateLayer();
    this.layerManager.switchStyle();
  }
}

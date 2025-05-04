/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-alert */

import { ActiveSelection, FabricObject, Group } from 'fabric';
import { v4 } from 'uuid';

import { propertiesToInclude } from '../const';
import { FabricRanderClass } from '../FabricRanderClass';
import {
  contextMenuHtml,
  createContextMenuHtml,
} from '../html/context_menu_html';
/**
 * @title 右键菜单
 * @description 右键菜单
 * @constructor fabricRender: FabricRanderClass
 */
export class FabricContextMenuClass {
  _clipboard!: FabricObject | null;
  isDragging: boolean = false;
  menu: Array<any> = [];
  offsetX: number | number = 0;
  offsetY: number | number = 0;
  type = 'contextMenu';
  private fabricRender!: FabricRanderClass;
  constructor(fabricRender: FabricRanderClass) {
    this.fabricRender = fabricRender;
    this.initializeContextMenuEvent(); // 初始化订阅主题
    this.initializeContextMenuControls();
  }
  // 创建工具元素栏
  initializeContextMenuControls() {
    const html = document.createElement('div');
    html.addEventListener('contextmenu', (event) => event.preventDefault());
    html.innerHTML = contextMenuHtml;
    // // 使用文档片段
    const parent = document.querySelector(
      `.${this.fabricRender.$$.containerClass}`,
    ) as HTMLElement;
    parent.append(html);
  }
  initializeContextMenuEvent() {
    this.fabricRender.$$.on('mouse:up', (opt) => {
      const e = opt.e as MouseEvent;
      this.offsetX = e.offsetX;
      this.offsetY = e.offsetY;
      const activeObject =
        this.fabricRender.$$.getActiveObject() as ActiveSelection;
      if (e.button === 2 && activeObject) {
        this.menu = [
          {
            clickFn: () => {
              const activeObjects =
                this.fabricRender.$$.getActiveObject() as ActiveSelection;
              if (activeObjects.type !== 'activeselection') return;
              activeObjects
                .clone(propertiesToInclude)
                .then((cloned: ActiveSelection) => {
                  activeObjects.getObjects().forEach((obj: FabricObject) => {
                    this.fabricRender.$$.remove(obj);
                  });
                  const list = cloned.getObjects();
                  const { left, top } = activeObjects.getBoundingRect();
                  const newGroup = new Group(list, {
                    // @ts-ignore
                    id: v4(),
                    left,
                    objectCaching: false,
                    top,
                  });
                  this.fabricRender.$$.add(newGroup);
                  this.fabricRender.$$.setActiveObject(newGroup);
                  this.onActivation(false);
                  this.fabricRender.emit('fabric-add-history');
                  this.fabricRender.refreshCanvas({ tool: true });
                });
            },
            label: '分组',
            type: 'group',
          },
          {
            border: true,
            clickFn: () => {
              const activeObjects =
                this.fabricRender.$$.getActiveObject() as ActiveSelection;
              if (activeObjects.type !== 'group') return;
              activeObjects
                .clone(propertiesToInclude)
                .then((cloned: ActiveSelection) => {
                  this.fabricRender.$$.remove(activeObjects);
                  this.fabricRender.$$.add(...cloned.removeAll());
                  this.onActivation(false);
                  this.fabricRender.emit('fabric-add-history');
                  this.fabricRender.refreshCanvas({ tool: true });
                });
            },
            label: '撤销分组',
            type: 'ungroup',
          },
          {
            clickFn: () => {
              const activeObjects = this.fabricRender.$$.getActiveObjects();
              activeObjects.forEach((obj: FabricObject) => {
                obj.set({
                  evented: false, // 禁止交互
                  selectable: false, // 禁止选择
                });
              });
              this.fabricRender.$$.discardActiveObject();
              this.onActivation(false);
              this.fabricRender.emit('fabric-add-history');
              this.fabricRender.refreshCanvas({ tool: true });
            },
            // shortcuts: 'Shift+L',
            helpMessage: '禁用后的元素无法被框选，需要去图层区进行释放',
            label: '禁用',
            type: 'selectable',
          },
          {
            clickFn: () => {
              const activeObjects = this.fabricRender.$$.getActiveObjects();
              activeObjects.forEach((obj: FabricObject) => {
                obj.set({
                  lockMovementX: true,
                  lockMovementY: true,
                  lockRotation: true,
                  lockScalingX: true,
                  lockScalingY: true,
                });
              });
              this.fabricRender.$$.discardActiveObject();
              this.onActivation(false);
              this.fabricRender.emit('fabric-add-history');
              this.fabricRender.refreshCanvas({ tool: true });
            },
            // shortcuts: 'Shift+L',
            label: '锁定',
            type: 'lock',
          },
          {
            // shortcuts: 'Shift+L',
            clickFn: () => {
              const activeObjects = this.fabricRender.$$.getActiveObjects();
              activeObjects.forEach((obj: FabricObject) => {
                obj.set({
                  lockMovementX: false,
                  lockMovementY: false,
                  lockRotation: false,
                  lockScalingX: false,
                  lockScalingY: false,
                });
              });
              this.fabricRender.$$.discardActiveObject();
              this.onActivation(false);
              this.fabricRender.emit('fabric-add-history');
              this.fabricRender.refreshCanvas({ tool: true });
            },
            label: '解锁',
            type: 'unlock',
          },
          {
            // shortcuts: 'Shift+S',
            border: true,
            clickFn: () => {
              const activeObjects = this.fabricRender.$$.getActiveObjects();
              activeObjects.forEach((obj: FabricObject) => {
                obj.set({ visible: false });
              });
              this.fabricRender.$$.discardActiveObject();
              this.onActivation(false);
              this.fabricRender.emit('fabric-add-history');
              this.fabricRender.refreshCanvas({ tool: true });
            },
            helpMessage: '隐藏后的元素无法被框选，需要去图层区进行显示',
            label: '隐藏',
            type: 'visible',
          },

          {
            border: true,
            clickFn: () => {},
            label: '图层操作',
            type: 'layer',
            children: [
              {
                // shortcuts: 'Shift+9',
                clickFn: () => {
                  if (activeObject.type === 'activeselection') return;
                  this.fabricRender.$$.bringObjectToFront(activeObject);
                  this.onActivation(false);
                  this.fabricRender.emit('fabric-add-history');
                  this.fabricRender.refreshCanvas({ tool: true });
                },
                type: 'topLayer',
                label: '置顶',
              },
              {
                // shortcuts: 'Shift+3',
                clickFn: () => {
                  if (activeObject.type === 'activeselection') return;
                  this.fabricRender.$$.sendObjectToBack(activeObject);
                  this.onActivation(false);
                  this.fabricRender.sendGridToBack();
                  this.fabricRender.emit('fabric-add-history');
                  this.fabricRender.refreshCanvas({ tool: true });
                },
                type: 'bottomLayer',
                label: '置底',
              },
              {
                // shortcuts: 'Shift+8',
                clickFn: () => {
                  if (activeObject.type === 'activeselection') return;
                  this.fabricRender.$$.bringObjectForward(activeObject);
                  this.onActivation(false);
                  this.fabricRender.emit('fabric-add-history');
                  this.fabricRender.refreshCanvas({ tool: true });
                },
                type: 'upLayer',
                label: '上移',
              },
              {
                // shortcuts: 'Shift+2',
                border: true,
                clickFn: () => {
                  if (activeObject.type === 'activeselection') return;
                  this.fabricRender.$$.sendObjectBackwards(activeObject);
                  this.onActivation(false);
                  this.fabricRender.emit('fabric-add-history');
                  this.fabricRender.refreshCanvas({ tool: true });
                },
                type: 'downLayer',
                label: '下移',
              },
            ],
          },
          {
            border: true,
            clickFn: () => {},
            label: '元素对齐',
            type: 'align',
            children: [
              {
                clickFn: () => {
                  const activeObjects =
                    this.fabricRender.$$.getActiveObject() as ActiveSelection;
                  if (activeObjects.type !== 'activeselection') return;
                  const { width } = activeObjects.getBoundingRect();
                  activeObjects.forEachObject((el: FabricObject) => {
                    const left = width / 2 - width;
                    el.set({
                      left,
                    });
                  });
                  this.fabricRender.emit('fabric-add-history');

                  this.onActivation(false);
                },
                label: '左对齐',
                type: 'leftAlign',
              },
              {
                clickFn: () => {
                  const activeObjects =
                    this.fabricRender.$$.getActiveObject() as ActiveSelection;
                  if (activeObjects.type !== 'activeselection') return;
                  const { width } = activeObjects.getBoundingRect();
                  activeObjects.forEachObject((el: FabricObject) => {
                    const { width: elw } = el.getBoundingRect();
                    const left = width - elw - width / 2;
                    el.set({
                      left,
                    });
                  });
                  this.fabricRender.emit('fabric-add-history');
                  this.onActivation(false);
                },
                label: '右对齐',
                type: 'rightAlign',
              },

              {
                clickFn: () => {
                  const activeObjects =
                    this.fabricRender.$$.getActiveObject() as ActiveSelection;
                  if (activeObjects.type !== 'activeselection') return;
                  const { height } = activeObjects.getBoundingRect();
                  activeObjects.forEachObject((el: FabricObject) => {
                    const top = height / 2 - height;
                    el.set({
                      top,
                    });
                  });
                  this.fabricRender.emit('fabric-add-history');
                  this.onActivation(false);
                },
                label: '顶对齐',
                type: 'topAlign',
              },
              {
                clickFn: () => {
                  const activeObjects =
                    this.fabricRender.$$.getActiveObject() as ActiveSelection;
                  if (activeObjects.type !== 'activeselection') return;
                  const { height } = activeObjects.getBoundingRect();
                  activeObjects.forEachObject((el: FabricObject) => {
                    const { height: elh } = el.getBoundingRect();
                    const top = height - elh - height / 2;
                    el.set({
                      top,
                    });
                  });
                  this.fabricRender.emit('fabric-add-history');
                  this.onActivation(false);
                },
                label: '底对齐',
                type: 'bottomAlign',
              },
              {
                clickFn: () => {
                  const activeObjects =
                    this.fabricRender.$$.getActiveObject() as ActiveSelection;
                  if (activeObjects.type !== 'activeselection') return;
                  const { width } = activeObjects.getBoundingRect();
                  activeObjects.forEachObject((el: FabricObject) => {
                    const { width: elw } = el.getBoundingRect();
                    const left = (width - elw) / 2 - width / 2;
                    el.set({
                      left,
                    });
                  });
                  this.fabricRender.emit('fabric-add-history');
                  this.onActivation(false);
                },
                label: '垂直居中',
                type: 'verticalAlign',
              },
              {
                border: true,
                clickFn: () => {
                  const activeObjects =
                    this.fabricRender.$$.getActiveObject() as ActiveSelection;
                  if (activeObjects.type !== 'activeselection') return;
                  const { height } = activeObjects.getBoundingRect();
                  activeObjects.forEachObject((el: FabricObject) => {
                    const { height: elh } = el.getBoundingRect();
                    const top = (height - elh) / 2 - height / 2;
                    el.set({
                      top,
                    });
                  });
                  this.fabricRender.emit('fabric-add-history');
                  this.onActivation(false);
                },
                label: '水平居中',
                type: 'horizontalAlign',
              },
            ],
          },
          // {
          //   // shortcuts: 'Ctrl+V',
          //   clickFn: () => {
          //     if (!this._clipboard) return alert('剪贴板为空');
          //     this._clipboard
          //       .clone(propertiesToInclude)
          //       .then((clonedObj: FabricObject) => {
          //         this.fabricRender.$$.discardActiveObject();
          //         clonedObj.set({
          //           left: e.offsetX,
          //           top: e.offsetY,
          //         });
          //         if (clonedObj instanceof ActiveSelection) {
          //           clonedObj.canvas = this.fabricRender.$$;
          //           clonedObj.forEachObject((obj: FabricObject) => {
          //             obj.setCoords();
          //             this.fabricRender.$$.add(obj);
          //           });
          //           clonedObj.setCoords();
          //         } else {
          //           this.fabricRender.$$.add(clonedObj);
          //         }
          //         this.fabricRender.$$.setActiveObject(clonedObj);
          //       });
          //     this.onActivation(false);
          //     this.fabricRender.emit('fabric-add-history');
          //     this.fabricRender.refreshCanvas({ tool: true });
          //   },
          //   label: '粘贴',
          //   type: 'paste',
          // },
          {
            clickFn: () => {
              const activeObjects =
                this.fabricRender.$$.getActiveObject() as ActiveSelection;
              activeObjects
                .clone(propertiesToInclude)
                .then((cloned: FabricObject) => {
                  this._clipboard = cloned;
                });
              this.onActivation(false);
            },
            label: '复制',
            type: 'copy',
          },
          {
            border: true,
            clickFn: () => {
              this._clipboard = null;
              this.onActivation(false);
            },
            label: '清空剪贴板',
            type: 'clipboard',
          },
          {
            // shortcuts: 'Delete',
            clickFn: () => {
              if (activeObject.type === 'activeselection') {
                const activeObjects = this.fabricRender.$$.getActiveObjects();
                activeObjects.forEach((obj: FabricObject) => {
                  this.fabricRender.$$.remove(obj);
                });
                this.fabricRender.$$.discardActiveObject();
              } else {
                this.fabricRender.$$.remove(activeObject);
              }
              this.onActivation(false);
              this.fabricRender.emit('fabric-add-history');
              this.fabricRender.refreshCanvas({ tool: true });
            },
            label: '删除',
            type: 'del',
          },
        ];
        this.onActivation(true);
        return;
      } else if (e.button === 2) {
        this.menu = [
          {
            // shortcuts: 'Ctrl+V',
            clickFn: () => {
              if (!this._clipboard) return alert('剪贴板为空');
              this._clipboard
                .clone(propertiesToInclude)
                .then((clonedObj: FabricObject) => {
                  this.fabricRender.$$.discardActiveObject();
                  const viewportPoint = this.fabricRender.$$.getScenePoint(e);
                  clonedObj.set({
                    left: viewportPoint.x,
                    top: viewportPoint.y,
                  });
                  if (clonedObj instanceof ActiveSelection) {
                    clonedObj.canvas = this.fabricRender.$$;
                    clonedObj.forEachObject((obj: FabricObject) => {
                      obj.id = v4();
                      obj.setCoords();
                      this.fabricRender.$$.add(obj);
                    });
                  } else {
                    clonedObj.id = v4();
                    this.fabricRender.$$.add(clonedObj);
                  }
                  this.onActivation(false);
                  this.fabricRender.emit('fabric-add-history');
                  this.fabricRender.refreshCanvas({ tool: true });
                });
            },
            label: '粘贴',
            type: 'paste',
          },
          {
            border: true,
            clickFn: () => {
              this._clipboard = null;
              this.onActivation(false);
            },
            label: '清空剪贴板',
            type: 'clipboard',
          },
          {
            clickFn: () => {
              const obj = this.fabricRender.$$.getObjects();
              obj.forEach((el: FabricObject) => {
                if (el.ignoreElement) return;
                this.fabricRender.$$.remove(el);
              });
              this.onActivation(false);
              // this.fabricRender.$$.clear();
              this.fabricRender.emit('fabric-add-history');
              // this.fabricRender.emit('fabric-clear-canvas');
              this.fabricRender.refreshCanvas({ tool: true });
            },
            label: '清除画布',
            type: 'clear',
          },
        ];

        this.onActivation(true);
        return;
      }
      this.onActivation(false);
    });
  }
  onActivation(show: boolean) {
    const contextMenuHtml = document.querySelector(
      '#fabric-context-menu',
    ) as HTMLElement;
    contextMenuHtml.style.display = show ? 'block' : 'none';
    const html = createContextMenuHtml(this.menu);
    contextMenuHtml.innerHTML = html;
    if (this.menu.length === 3 && show) {
      const w = 160;
      const h = 116;
      const width = this.fabricRender.$$.width as number;
      const height = this.fabricRender.$$.height as number;
      if (width - this.offsetX <= w) this.offsetX -= w;
      // 如果鼠标靠近画布底部，菜单就出现在鼠标指针上方
      if (height - this.offsetY <= h) this.offsetY -= h;
      contextMenuHtml.style.left = `${this.offsetX + 9}px`;
      contextMenuHtml.style.top = `${this.offsetY}px`;
    } else if (this.menu.length === 11 && show) {
      const w = 160;
      const h = 490;
      const width = this.fabricRender.$$.width as number;
      const height = this.fabricRender.$$.height as number;
      if (width - this.offsetX <= w) this.offsetX -= w;
      // 如果鼠标靠近画布底部，菜单就出现在鼠标指针上方
      if (height - this.offsetY <= h) this.offsetY -= h;
      contextMenuHtml.style.left = `${this.offsetX + 9}px`;
      contextMenuHtml.style.top = `${this.offsetY}px`;
    }
  }
}

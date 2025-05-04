// // import { fabric } from 'fabric';

// import { FabricApiHandlerClass } from './FabricApiHandlerClass';
// /**
//  * Event Handler Class
//  * @author salgum1114
//  * @class EventHandler
//  */
// export class FabricApiEventHandler {
//   handler!: FabricApiHandlerClass;
//   oldLeft: number = 0;
//   oldTop: number = 0;
//   constructor(apiHandler: FabricApiHandlerClass) {
//     this.handler = apiHandler;
//     this.initialize();
//   }
//   initialize() {
//     // this.handler.fabricRender.$$.on('object:moving', (opt) => {
//     //   this.moving(opt);
//     // });
//     // this.handler.fabricRender.$$.on('object:scaling', (opt) => {
//     //   this.scaling(opt);
//     // });
//     // this.handler.fabricRender.$$.on('object:rotating', (opt) => {
//     //   this.rotating(opt);
//     // });
//     // // this.handler.fabricRender.$$.on('mouse:wheel', () => {
//     // //   this.wheel();
//     // // });
//     // this.handler.fabricRender.$$.on('selection:created', () => {
//     //   const selections = this.handler.fabricRender.$$.getActiveObjects();
//     //   if (selections.length >= 2) {
//     //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     //     // @ts-ignore
//     //     const flag = selections.some((i) => i.superType === 'element');
//     //     if (flag) this.handler.fabricRender.$$.discardActiveObject();
//     //     // eslint-disable-next-line no-alert
//     //     if (flag) alert('网页元素无法与其他元素进行款选');
//     //   }
//     // });
//     // this.handler.fabricRender.$$.on('selection:updated', () => {
//     //   const selections = this.handler.fabricRender.$$.getActiveObjects();
//     //   if (selections.length >= 2) {
//     //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     //     // @ts-ignore
//     //     const flag = selections.some((i) => i.superType === 'element');
//     //     if (flag) this.handler.fabricRender.$$.discardActiveObject();
//     //     // eslint-disable-next-line no-alert
//     //     if (flag) alert('网页元素无法与其他元素进行款选');
//     //   }
//     // });
//     // this.handler.fabricRender.$$.on('selection:cleared', (opt) => {});
//     // this.fabricRender.$$.on('object:scaling', this.scaling);
//     //  'object:modified': this.modified,
//     // 			'object:scaled': this.scaled,
//     // 			'object:moving': this.moving,
//     // 			'object:moved': this.moved,
//     // 			'object:rotating': this.rotating,
//     // 			'object:rotated': this.rotated,
//     // 			'mouse:wheel': this.mousewheel,
//     // 			'mouse:down': this.mousedown,
//     // 			'mouse:move': this.mousemove,
//     // 			'mouse:up': this.mouseup,
//     // 			'selection:cleared': this.selection,
//     // 			'selection:created': this.selection,
//     // 			'selection:updated': this.selection,
//   }

//   //   moving(opt: fabric.IEvent) {
//   //     const {
//   //       target,
//   //     }: {
//   //       target: fabric.ActiveSelection & { id?: string; superType?: string };
//   //     } = opt as any;
//   //     // 处理单个对象的情况
//   //     if (target.superType === 'element') {
//   //       const { id } = target;
//   //       if (!id) return;
//   //       target.setCoords();
//   //       const el = this.handler.elementHandler.findById(id) as HTMLElement;
//   //       const { left = 0, top = 0 } = target.getBoundingRect(true);
//   //       el.style.left = `${left.toFixed(2)}px`;
//   //       el.style.top = `${top.toFixed(2)}px`;
//   //     }
//   //   }
//   //   rotating(opt: fabric.IEvent) {
//   //     const { target } = opt as any;
//   //     // if (target.type === "activeselection") {
//   //     //   const activeSelection = target as fabric.ActiveSelection;
//   //     //   activeSelection.getObjects().forEach((obj: any) => {
//   //     //     if (obj.superType === 'element') {
//   //     //       const { id } = obj;
//   //     //       const el = this.handler.elementHandler.findById(id) as HTMLElement;
//   //     //       this.handler.elementHandler.setScaleOrAngle(el, target);
//   //     //     }
//   //     //   });
//   //     //   return;
//   //     // }
//   //     if (target.superType === 'element') {
//   //       const { angle, id } = target;
//   //       const el = this.handler.elementHandler.findById(id) as HTMLElement;
//   //       el.style.transform = `rotate(${angle}deg)`;
//   //     }
//   //   }
//   //   scaling(opt: fabric.IEvent) {
//   //     const { target } = opt as any;
//   //     // if (target.type === "activeselection") {
//   //     //   const activeSelection = target as fabric.ActiveSelection;
//   //     //   const { scaleX = 1, scaleY = 1 } = activeSelection;
//   //     //   activeSelection.getObjects().forEach((obj: any) => {
//   //     //     if (obj.superType === 'element') {
//   //     //       const { id } = obj;
//   //     //       const el = this.handler.elementHandler.findById(id) as HTMLElement;
//   //     //       this.handler.elementHandler.setSize(el, obj, scaleX, scaleY);
//   //     //       obj.setCoords(); // 更新对象的坐标
//   //     //       const zoom = this.handler.fabricRender.$$.getZoom();
//   //     //       const { left = 0, top = 0 } = obj.getBoundingRect(false);
//   //     //       const padLeft = (obj.width * scaleX * zoom - obj.width) / 2;
//   //     //       const padTop = (obj.height * scaleY * zoom - obj.height) / 2;
//   //     //       el.style.left = `${(left + padLeft).toFixed(2)}px`;
//   //     //       el.style.top = `${(top + padTop).toFixed(2)}px`;
//   //     //     }
//   //     //   });
//   //     //   return;
//   //     // }
//   //     if (target.superType === 'element') {
//   //       target.setCoords(); // 更新对象的坐标
//   //       const { id } = target;
//   //       const el = this.handler.elementHandler.findById(id) as HTMLElement;
//   //       const zoom = this.handler.fabricRender.$$.getZoom();
//   //       const { height = 0, scaleX = 1, scaleY = 1, width = 0 } = target;
//   //       el.style.width = `${(width * scaleX * zoom).toFixed(2)}px`;
//   //       el.style.height = `${(height * scaleY * zoom).toFixed(2)}px`;
//   //       const { left = 0, top = 0 } = target.getBoundingRect(false);
//   //       el.style.left = `${left.toFixed(2)}px`;
//   //       el.style.top = `${top.toFixed(2)}px`;
//   //     }
//   //   }
//   //   // wheel() {
//   //   //   // const { deltaY } = opt as any;
//   //   //   // console.log(deltaY);
//   //   //   const zoomDelta = this.handler.fabricRender.zoom.zoomDelta;
//   //   //   const minZoomLevel = this.handler.fabricRender.zoom.minZoomLevel;
//   //   //   const maxZoomLevel = this.handler.fabricRender.zoom.maxZoomLevel;
//   //   //   let currentZoom =
//   //   //     this.handler.fabricRender.$$.getZoom() * 0.999 ** zoomDelta;
//   //   //   currentZoom = Math.min(maxZoomLevel, Math.max(minZoomLevel, currentZoom));
//   //   // }
// }
export const a = 1;

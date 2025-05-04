// import { FabricApiHandlerClass } from './FabricApiHandlerClass';

// export class FabricApiElementHandler {
//   handler!: FabricApiHandlerClass;
//   constructor(apiHandler: FabricApiHandlerClass) {
//     this.handler = apiHandler;
//   }
//   findById = (id?: string) => {
//     // eslint-disable-next-line unicorn/prefer-query-selector
//     return document.getElementById(`${id}`);
//   };
//   setPosition = (el: HTMLElement, obj: fabric.Object) => {
//     if (!el) return;
//     // obj.setCoords();
//     const { left, top } = obj;
//     // console.log(left, top);
//     // const { height, scaleX, scaleY, width } = obj;
//     // const { left, top } = obj.getBoundingRect(false);
//     // const padLeft = (width * scaleX * zoom - width) / 2;
//     // const padTop = (height * scaleY * zoom - height) / 2;
//     el.style.left = `${left?.toFixed(2)}px`;
//     el.style.top = `${top?.toFixed(2)}px`;
//   };
//   setPositionByOrigin = (el: HTMLElement, left: number, top: number) => {
//     if (!el) return;
//     // obj.setCoords();
//     // const zoom = this.handler.fabricRender.$$.getZoom();
//     // const padLeft = (width * scaleX * zoom - width) / 2;
//     // const padTop = (height * scaleY * zoom - height) / 2;
//     el.style.left = `${left?.toFixed(2)}px`;
//     el.style.top = `${top?.toFixed(2)}px`;
//   };
//   setScaleOrAngle = (el: HTMLElement, obj: fabric.Object) => {
//     if (!el) return;
//     const zoom = this.handler.fabricRender.$$.getZoom();
//     const { angle, scaleX, scaleY } = obj;
//     el.style.transform = `rotate(${angle}deg) scale(${scaleX * zoom.toFixed(2)}, ${scaleY * zoom.toFixed(2)})`;
//   };
//   setSize = (
//     el: HTMLElement,
//     obj: fabric.Object,
//     scaleX: number,
//     scaleY: number,
//   ) => {
//     if (!el) return;
//     const { height, width } = obj;
//     el.style.width = `${width * scaleX}px`;
//     el.style.height = `${height * scaleY}px`;
//   };
// }
export const a = 1;

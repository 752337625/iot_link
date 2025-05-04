import * as fabric from 'fabric';

import { FabricRanderClass } from '../FabricRanderClass';
/**
 * 1.缩略图的目的是看到全部的元素
 * 2.缩略图内部有一个小方框，小方框的目的是看到缩略图的中心元素
 */
export class FabricMinimapClass {
  minimap!: fabric.Canvas;
  style: {
    right: string;
    top: string;
  } = {
    right: '10px',
    top: '10px',
  };
  private fabricRender!: FabricRanderClass;
  constructor(fabricRender: FabricRanderClass) {
    this.fabricRender = fabricRender;
    this.initializeMinMapControls();
    this.initMinimap();
    // updateMiniMapVP();
  }
  initializeMinMapControls() {
    // const div = document.createElement('div');
    // div.id = 'minimap-parent';
    // div.style.width = '320px';
    // div.style.height = '180px';
    // div.style.position = 'absolute';
    // div.style.top = this.style.top;
    // div.style.right = this.style.right;
    // div.style.overflow = 'hidden';
    // div.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    // div.style.border = '1px solid #CCC';
    // div.style.boxSizing = 'border-box';
    // div.style.userSelect = 'none';
    // const canvas = document.createElement('canvas');
    // canvas.id = 'minimap';
    // canvas.width = 320;
    // canvas.height = 180;
    // div.append(canvas);
    // const parent = document.querySelector(
    //   `.${this.fabricRender.$$.containerClass}`,
    // ) as HTMLElement;
    // parent.append(div);
  }
  initMinimap() {
    // this.minimap = new fabric.Canvas('minimap', {
    //   height: 176,
    //   selection: false,
    //   width: 316,
    // });
    // this.fabricRender.on('fabric-add-update-element-success', () => {
    //   const vpt = this.fabricRender.$$.viewportTransform;
    //   this.fabricRender.$$.viewportTransform = [1, 0, 0, 1, 0, 0];
    //   const data = this.fabricRender.$$.toDataURL({
    //     format: 'png',
    //     height: this.fabricRender.$$.getHeight(),
    //     left: 0,
    //     multiplier: 1,
    //     top: 0,
    //     width: this.fabricRender.$$.getWidth(),
    //   });
    //   this.fabricRender.$$.viewportTransform = vpt;
    //   const img = new Image();
    //   img.src = data;
    //   this.minimap.backgroundImage = new fabric.FabricImage(img);
    //   this.minimap.requestRenderAll();
    //   document.body.append(img);
    // });
  }
  initMinimapVP() {}
  updateMiniMap() {}
  updateMiniMapVP() {}
}

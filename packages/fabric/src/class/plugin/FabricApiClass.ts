import { GifClass } from '../api/objects/GifClass';
import { IframeClass } from '../api/objects/IframeClass';
import { ImageClass } from '../api/objects/ImageClass';
import { StateMoreWaterFlowPathClass } from '../api/objects/path/StateMoreWaterFlowPathClass';
import { ContinuousArrowDropletPipeClass } from '../api/objects/pipe/ContinuousArrowDropletPipeClass';
import { ContinuousWaterDropletPipeClass } from '../api/objects/pipe/ContinuousWaterDropletPipeClass';
import { ContinuousWaterFlowPipeClass } from '../api/objects/pipe/ContinuousWaterFlowPipeClass';
import { DotPipeClass } from '../api/objects/pipe/DotPipeClass';
import { IntervalWaterDropletPipeClass } from '../api/objects/pipe/IntervalWaterDropletPipeClass';
import { IntervalWaterFlowPipeClass } from '../api/objects/pipe/IntervalWaterFlowPipeClass';
import { StateLessWaterFlowPipeClass } from '../api/objects/pipe/StateLessWaterFlowPipeClass';
import { StateMoreWaterFlowPipeClass } from '../api/objects/pipe/StateMoreWaterFlowPipeClass';
import { loadSvg, SvgClass } from '../api/objects/SvgClass';
import { SvgGifClass } from '../api/objects/SvgGifClass';
import { VideoClass } from '../api/objects/VideoClass';
import { FabricRanderClass } from '../FabricRanderClass';

export class FabricApiClass {
  private fabricRender!: FabricRanderClass;
  constructor(fabricRender: FabricRanderClass) {
    this.fabricRender = fabricRender;
    this.initialize();
  }
  initialize() {
    this.fabricRender.$$.on('dragover', (opt) => {
      const { e } = opt;
      e.preventDefault();
      (e.dataTransfer as DataTransfer).effectAllowed = 'copyMove';
      (e.dataTransfer as DataTransfer).dropEffect = 'move';
    });
    this.fabricRender.$$.on('drop', (opt) => {
      const { e } = opt;
      e.preventDefault(); // 阻止默认行为
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const data = e.dataTransfer?.getData('component') as string;
      const dataSet = JSON.parse(data); // 解析组件数据
      const viewportPoint = this.fabricRender.$$.getScenePoint(e);
      this.rendering({
        dataSet,
        left: viewportPoint.x,
        top: viewportPoint.y,
      });
    });
  }
  async rendering(options: {
    dataSet: { [key: string]: any; type: string };
    left: number;
    top: number;
  }) {
    const { type } = options.dataSet;
    if (type === 'video') {
      const video = new VideoClass(options);
      this.fabricRender.$$.add(video);
      this.fabricRender.$$.setActiveObject(video);
    }
    if (type === 'img') {
      const image = new ImageClass(options);
      this.fabricRender.$$.add(image);
      this.fabricRender.$$.setActiveObject(image);
    }
    if (type === 'iframe') {
      const iframe = new IframeClass(options);
      this.fabricRender.$$.add(iframe);
      this.fabricRender.$$.setActiveObject(iframe);
    }
    if (type === 'svg') {
      const svgObj = await loadSvg(options);
      const svg = await new SvgClass([svgObj], options);
      this.fabricRender.$$.add(svg);
      this.fabricRender.$$.setActiveObject(svg);
    }
    if (type === 'svggif') {
      const svggif = await new SvgGifClass(options);
      this.fabricRender.$$.add(svggif);
      this.fabricRender.$$.setActiveObject(svggif);
    }
    if (type === 'gif') {
      const gif = new GifClass(options);
      this.fabricRender.$$.add(gif);
      this.fabricRender.$$.setActiveObject(gif);
    }
    // 连续的箭头管道
    if (type === 'ContinuousArrowDropletPipe') {
      const pipe = new ContinuousArrowDropletPipeClass(
        options.dataSet.points,
        options,
      );
      this.fabricRender.$$.add(pipe);
      this.fabricRender.$$.setActiveObject(pipe);
    }
    // 连续的水滴管道
    if (type === 'ContinuousWaterDropletPipe') {
      const pipe = new ContinuousWaterDropletPipeClass(
        options.dataSet.points,
        options,
      );
      this.fabricRender.$$.add(pipe);
      this.fabricRender.$$.setActiveObject(pipe);
    }
    // 间隔的水滴管道
    if (type === 'IntervalWaterDropletPipe') {
      const pipe = new IntervalWaterDropletPipeClass(
        options.dataSet.points,
        options,
      );
      this.fabricRender.$$.add(pipe);
      this.fabricRender.$$.setActiveObject(pipe);
    }
    // 连续的水流管道
    if (type === 'ContinuousWaterFlowPipe') {
      const pipe = new ContinuousWaterFlowPipeClass(
        options.dataSet.points,
        options,
      );
      this.fabricRender.$$.add(pipe);
      this.fabricRender.$$.setActiveObject(pipe);
    }
    // 间隔的水流管道
    if (type === 'IntervalWaterFlowPipe') {
      const pipe = new IntervalWaterFlowPipeClass(
        options.dataSet.points,
        options,
      );
      this.fabricRender.$$.add(pipe);
      this.fabricRender.$$.setActiveObject(pipe);
    }

    // 无状态水流管道
    if (type === 'StateLessWaterFlowPipe') {
      const pipe = new StateLessWaterFlowPipeClass(
        options.dataSet.points,
        options,
      );
      this.fabricRender.$$.add(pipe);
      this.fabricRender.$$.setActiveObject(pipe);
    }
    // 有状态水流管道
    if (type === 'StateMoreWaterFlowPipe') {
      const pipe = new StateMoreWaterFlowPipeClass(
        options.dataSet.points,
        options,
      );
      this.fabricRender.$$.add(pipe);
      this.fabricRender.$$.setActiveObject(pipe);
    }
    // 圆点管道
    if (type === 'DotPipe') {
      const pipe = new DotPipeClass(options.dataSet.points, options);
      this.fabricRender.$$.add(pipe);
      this.fabricRender.$$.setActiveObject(pipe);
    }
    // 路径
    if (type === 'StateMoreWaterFlowPath') {
      const path = new StateMoreWaterFlowPathClass(
        options.dataSet.path,
        options,
      );
      this.fabricRender.$$.add(path);
      this.fabricRender.$$.setActiveObject(path);
    }
    if (type === 'rect') {
      //
    }
    if (type === 'circle') {
      //
    }
    if (type === 'ellipse') {
      //
    }
    if (type === 'line') {
      //
    }
    if (type === 'polyline') {
      //
    }
    if (type === 'polygon') {
      //
    }
    if (type === 'triangle') {
      //
    }
    if (type === 'html') {
      //
    }

    // 其他
    if (type === 'other') {
      //
    }
    this.fabricRender.emit('fabric-add-history');
    this.fabricRender.emit('fabric-add-component-success');
  }
}

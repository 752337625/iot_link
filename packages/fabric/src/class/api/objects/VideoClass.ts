import { classRegistry, FabricImage } from 'fabric';
import { v4 } from 'uuid';

export class VideoClass extends FabricImage {
  static override type = 'video';
  override dataSet!: Record<string, any>;
  id!: string;
  superType = 'Image';
  constructor(option: any) {
    const videoElement = createVideoElement(option.dataSet.source);
    super(videoElement, option);
    this.dataSet = option.dataSet;
    this.id = v4();
    this.setOptions({
      objectCaching: false,
      snapAngle: 20,
      snapThreshold: 3,
    });
  }
  static override fromObject(options: Record<string, unknown>) {
    return new Promise<VideoClass>((resolve) => {
      resolve(new VideoClass(options));
    });
  }
}
classRegistry.setClass(VideoClass, 'video');

function createVideoElement(sourceUrl: string): HTMLVideoElement {
  const videoElement = document.createElement('video');
  const sourceElement = document.createElement('source');
  videoElement.width = 480;
  videoElement.height = 360;
  videoElement.muted = false;
  videoElement.loop = true;
  videoElement.controls = false;
  videoElement.autoplay = true;
  videoElement.preload = 'auto';
  videoElement.append(sourceElement);
  sourceElement.src = sourceUrl;
  videoElement.play();
  return videoElement;
}

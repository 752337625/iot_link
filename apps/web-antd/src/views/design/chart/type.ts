import {
  FabricBackgroundClass,
  FabricDragLayoutClass,
  FabricGridClass,
  FabricRanderClass,
  FabricZoomClass,
} from '@vben/fabric';

declare global {
  interface Window {
    _IOT_FABRIC_: FabricRanderClass;
    _IOT_FABRIC_GRID_: FabricGridClass;
    _IOT_FABRIC_BG_: FabricBackgroundClass;
    _IOT_FABRIC_DRAG_LAYOUT_: FabricDragLayoutClass;
    _IOT_FABRIC_ZOOM_: FabricZoomClass;
  }
}

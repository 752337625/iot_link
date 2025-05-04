/* eslint-disable @typescript-eslint/no-invalid-void-type */
export type MittRenderEvents = {
  ['fabric-active-context-menu']: {
    clientX?: number | undefined;
    clientY?: number | undefined;
    menu?: any | undefined;
    showMenu: boolean;
  };
  /**
   * 元素被添加，被修改等操作需要通知
   */
  ['fabric-add-component-success']: void;
  /**
   * 添加历史事件
   */
  ['fabric-add-history']: void;
  /**
   * 初始化成功
   */
  ['fabric-init-success']: void;
  /**
   * 缩放变化
   */
  ['fabric-zoom-change']: number;
  // ['fabric-init-context-menu']: Konva.Node[];
  // ['asset-rotation-change']: Konva.Node[];
  // ['debug-change']: boolean;
  // ['graph-type-change']: GraphType | undefined;
  // ['history-change']: { index: number; records: string[] };
  // ['link-selection-change']: Konva.Line | undefined;
  // ['link-type-change']: LinkType;
  // ['loading']: boolean;
  // //
  // ['page-settings-change']: PageSettings;
  // ['scale-change']: number;
  // ['selection-change']: Konva.Node[];
  // ['texting-change']: boolean;
};
